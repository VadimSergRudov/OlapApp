namespace WebApp.Domain.Entities
{
    public class DimCountry
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public int Code { get; set; }
        public List<Facts> Facts { get; set; } = new List<Facts>();
    }
}
