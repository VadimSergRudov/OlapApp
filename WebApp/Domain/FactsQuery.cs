namespace WebApp.Domain
{
    public class FactsQuery
    {
        public Guid ValueId { get; set; } 
        public string Frequency { get; set; }
        public DateTime? SinceDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string Dimension { get; set; }
    }
}
