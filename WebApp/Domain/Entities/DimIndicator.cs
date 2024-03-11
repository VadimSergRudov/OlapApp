namespace WebApp.Domain.Entities
{
    public class DimIndicator
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public List<Facts> Facts { get; set; }
    }
}
