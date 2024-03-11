namespace WebApp.Domain.DTO
{
    public class AgrFactDto
    {
        public Guid Id { get; set; }
        public float SumValue { get; set; }
        public float AverageValue { get; set; }
        public float MaxValue { get; set; }
        public float MinValue { get; set; }
        public string? IndicatorName { get; set; }
        public string? CountryName { get; set; }
    }
}
