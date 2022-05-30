namespace FootballTournament.ViewModels.Tournaments
{
    public class GetTournamentViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Country { get; set; }

        public string Category { get; set; }

        public decimal Price { get; set; }

        public string Winner { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }
    }
}
