namespace FootballTournament.ViewModels.Teams
{

    public class ListTeamViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int MaxCapacity { get; set; }

        public int FreeCapacity { get; set; }

        public bool IsCreated { get; set; }

        public CaptainViewModel Captain { get; set; }
    }
}
