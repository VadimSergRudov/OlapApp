using AutoMapper;
using WebApp.Domain.DTO;
using WebApp.Domain.Entities;

namespace WebApp
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<DimCountry, CountryDto>();
            CreateMap<DimIndicator, IndicatorDto>();
            CreateMap<Facts, FactDto>()
                .ForMember(dest => dest.IndicatorName, opt => opt.MapFrom(src => src.Indicator != null ? src.Indicator.Name : ""))
                .ForMember(dest => dest.CountryName, opt => opt.MapFrom(src => src.Country != null ? src.Country.Name : ""));

        }
    }
}
