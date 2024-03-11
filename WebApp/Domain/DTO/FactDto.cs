namespace WebApp.Domain.DTO
{
    public class FactDto
    {
        public Guid Id { get; set; }
        public string CountryName { get; set; }
        public string IndicatorName { get; set; }
        public DateTime Date { get; set; }
        public float Value { get; set; }
    }
    
}
