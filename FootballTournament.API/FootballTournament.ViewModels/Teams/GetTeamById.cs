namespace FootballTournament.ViewModels.Teams
{
    public class GetTeamById
    {
        public int Id { get; set;  }

        public string Name { get; set; }

        public int MaxCapacity { get; set; }

        public ICollection<CaptainViewModel> Players { get; set; }

        public CaptainViewModel CurrentCaptain { get; set; }
    }
}
