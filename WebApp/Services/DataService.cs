using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System.Data;
using WebApp.Data;
using WebApp.Domain;
using WebApp.Domain.DTO;
using WebApp.Domain.Entities;
using WebApp.Services.Interfaces;

namespace WebApp.Services
{
    public class DataService : IDataService
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public DataService(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public List<IndicatorDto> GetIndicators()
        {
            List<DimIndicator> indicatorEntities = _context.Indicators.ToList();
            return _mapper.Map<List<IndicatorDto>>(indicatorEntities);
        }

        public List<CountryDto> GetCountries()
        {
            List<DimCountry> countryEntities =  _context.Countries.ToList();
            return _mapper.Map<List<CountryDto>>(countryEntities);
        }

        public async Task<List<FactDto>> GetFacts(FactsQuery factsQuery)
        {
            var query = _context.Facts
                        .Where(f => f.Frequency == factsQuery.Frequency);

            if (factsQuery.Dimension == "Country")
            {
                query = query.Where(f => f.CountryId == factsQuery.ValueId);
            }
            else if (factsQuery.Dimension == "Indicator")
            {
                query = query.Where(f => f.IndicatorId == factsQuery.ValueId);
            }

            if(factsQuery.SinceDate != null && factsQuery.ToDate == null)
            {
                query = query.Where(f => f.Date.Year >= factsQuery.SinceDate.Value.Year);
            }
            else if (factsQuery.SinceDate != null && factsQuery.ToDate != null)
            {
                query = query.Where(f => f.Date.Year >= factsQuery.SinceDate.Value.Year && f.Date.Year <= factsQuery.ToDate.Value.Year);
            }

            query = query.Include(f => f.Country).Include(f => f.Indicator);
            query = query.OrderBy(x => x.Date);

            var queryResult = await query.ToListAsync();

            return _mapper.Map<List<FactDto>>(queryResult);
        }

        public async Task<List<AgrFactDto>> GetAgrFacts(FactsQuery factsQuery)
        {
            var query = _context.Facts.Where(f => f.Frequency == factsQuery.Frequency);

            if (factsQuery.Dimension == "Country")
            {
                query = query.Where(f => f.CountryId == factsQuery.ValueId);
            }
            else if (factsQuery.Dimension == "Indicator")
            {
                query = query.Where(f => f.IndicatorId == factsQuery.ValueId);
            }

            if (factsQuery.SinceDate != null && factsQuery.ToDate == null)
            {
                query = query.Where(f => f.Date.Year >= factsQuery.SinceDate.Value.Year);
            }
            else if (factsQuery.SinceDate != null && factsQuery.ToDate != null)
            {
                query = query.Where(f => f.Date.Year >= factsQuery.SinceDate.Value.Year && f.Date.Year <= factsQuery.ToDate.Value.Year);
            }

            query = query.Include(f => f.Country).Include(f => f.Indicator);

            List<IGrouping<Guid,Facts>> groups = new List<IGrouping<Guid, Facts>>();
            if (factsQuery.Dimension == "Country")
            {
                groups = await query.GroupBy(f => f.IndicatorId).ToListAsync();
            }
            else if (factsQuery.Dimension == "Indicator")
            {
                groups = await query.GroupBy(f => f.CountryId).ToListAsync(); ;
            }

            var result = groups.Select(group => new AgrFactDto
            {
                Id = group.Key,
                SumValue = group.Sum(f => f.Value),
                AverageValue = group.Average(f => f.Value),
                MaxValue = group.Max(f => f.Value),
                MinValue = group.Min(f => f.Value),
                IndicatorName = group.First().Indicator.Name,
                CountryName = group.First().Country.Name
            }).ToList();

            return result;
        }

        public string UploadData()
        {
            if(_context.Countries.ToList().Count > 0)
            {
                return "Data already uploaded";
            }

            try
            {
                string filePath = "C:\\Data.xlsx";

                using (ExcelPackage package = new ExcelPackage(new System.IO.FileInfo(filePath)))
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                    DataTable dt = new DataTable();

                    foreach (var firstRowCell in worksheet.Cells[1, 1, 1, worksheet.Dimension.End.Column])
                    {
                        dt.Columns.Add(firstRowCell.Text);
                    }

                    for (int rowNum = 2; rowNum <= worksheet.Dimension.End.Row; rowNum++)
                    {
                        ExcelRange row = worksheet.Cells[rowNum, 1, rowNum, worksheet.Dimension.End.Column];
                        DataRow newRow = dt.Rows.Add();

                        foreach (var cell in row)
                        {
                            newRow[cell.Start.Column - 1] = cell.Text;
                        }
                    }
                    List<DimCountry> countries = new List<DimCountry>();
                    List<DimIndicator> indicators = new List<DimIndicator>();
                    List<Facts> facts = new List<Facts>();

                    foreach (DataRow row in dt.Rows)
                    {
                        int countryCode = Convert.ToInt32(row["Country Code"]);
                        var currentCountry = countries.FirstOrDefault(c => c.Code == countryCode);
                        if (currentCountry == null)
                        {
                            DimCountry country = new DimCountry
                            {
                                Code = countryCode,
                                Name = row["Country Name"].ToString() ?? "",
                                Id = Guid.NewGuid(),
                            };

                            countries.Add(country);
                            currentCountry = country;
                        }


                        string indicatoryCode = row["Indicator Code"].ToString();
                        var currentIndicator = indicators.FirstOrDefault(c => c.Code == indicatoryCode);
                        if (currentIndicator == null)
                        {
                            DimIndicator indicator = new DimIndicator
                            {
                                Code = indicatoryCode,
                                Name = row["Indicator Name"].ToString() ?? "",
                                Id = Guid.NewGuid(),
                            };

                            indicators.Add(indicator);
                            currentIndicator = indicator;
                        }

                        facts.Add(new Facts
                        {
                            Id = Guid.NewGuid(),
                            CountryId = currentCountry.Id,
                            IndicatorId = currentIndicator.Id,
                            Country = currentCountry,
                            Indicator = currentIndicator,
                            Frequency = row["Frequency"].ToString(),
                            Date = Convert.ToDateTime(row["Date"]),
                            Value = float.Parse(row["Value"].ToString())
                        });
                    }


                    _context.Facts.AddRange(facts);
                    _context.Indicators.AddRange(indicators);
                    _context.Countries.AddRange(countries);
                    _context.SaveChanges();

                    return "Data uploaded successfully";
                }
            }
            catch (Exception ex)
            {
                return $"UploadFailed with error @{ex.Message}";
            }
        }
        
    }
}
