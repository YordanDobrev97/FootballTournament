
namespace FootballTournament.Data.Models
{
    public class Team
    {
        public Team()
        {
            this.Players = new HashSet<ApplicationUser>();
        }

        public int Id  { get; set; }

        public string Name { get; set; }

        public int MaxCapacity { get; set; }

        public ICollection<ApplicationUser> Players { get; set; }

        public ApplicationUser Captain { get; set; }
    }
}
