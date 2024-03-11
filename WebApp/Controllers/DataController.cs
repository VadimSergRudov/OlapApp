using Microsoft.AspNetCore.Mvc;
using WebApp.Data;
using WebApp.Services.Interfaces;
using WebApp.Domain;
using WebApp.Domain.DTO;
namespace WebApp.Controllers
{
    [Route("api/data")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly IDataService _dataService;
        public DataController(IDataService dataService)
        {
            _dataService = dataService;
        }

        [HttpGet(template: "indicators")]
        public ActionResult<List<IndicatorDto>> GetIndicators()
        {
            List<IndicatorDto> result = _dataService.GetIndicators();
            return Ok(result);
        }

        [HttpGet(template: "counties")]
        public ActionResult<List<CountryDto>> GetCountries()
        {
            List<CountryDto> result = _dataService.GetCountries();
            return Ok(result);
        }

        [HttpGet(template: "facts")]
        public async Task<ActionResult<List<FactDto>>> GetFacts([FromQuery] FactsQuery queryObject)
        {
            List<FactDto> result = await _dataService.GetFacts(queryObject);
            return Ok(result);
        }

        [HttpGet(template: "agrfacts")]
        public async Task<ActionResult<List<AgrFactDto>>> GetAgrFacts([FromQuery] FactsQuery queryObject)
        {
            List<AgrFactDto> result = await _dataService.GetAgrFacts(queryObject);
            return Ok(result);
        }

        
        [HttpGet(template: "uploadData")]
        public string UpoadData()
        {
            return _dataService.UploadData();
        }
    }
}
