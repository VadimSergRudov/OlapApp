namespace WebApp.Domain.Entities
{
    public class Facts
    {
        public Guid Id { get; set; }
        public string? Frequency { get; set; }
        public DateTime Date { get; set; }
        public float Value { get; set; }
        public Guid CountryId { get; set; }
        public DimCountry? Country { get; set; }
        public Guid IndicatorId { get; set; }
        public DimIndicator? Indicator { get; set; }
    }
}
