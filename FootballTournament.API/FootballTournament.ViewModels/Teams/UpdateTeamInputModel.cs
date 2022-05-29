namespace FootballTournament.ViewModels.Teams
{
    public class UpdateTeamInputModel
    {
        public int Id { get; set; }

        public string Name { get; set;  }

        public int MaxCapacity { get; set; }

        public string NewCaptainId { get; set; }
    }
}
