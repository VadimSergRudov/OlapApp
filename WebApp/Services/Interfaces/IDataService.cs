using WebApp.Domain;
using WebApp.Domain.DTO;

namespace WebApp.Services.Interfaces
{
    public interface IDataService
    {
        List<CountryDto> GetCountries();
        List<IndicatorDto> GetIndicators();
        Task<List<FactDto>> GetFacts(FactsQuery factsQuery);
        Task<List<AgrFactDto>> GetAgrFacts(FactsQuery factsQuery);
        string UploadData();
    }
}
