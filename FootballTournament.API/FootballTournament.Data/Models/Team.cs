
namespace FootballTournament.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Team
    {
        public Team()
        {
            this.Players = new HashSet<ApplicationUser>();
        }

        [Key]
        public int Id  { get; set; }

        [Required]
        public string Name { get; set; }

        public int MaxCapacity { get; set; }

        public ICollection<ApplicationUser> Players { get; set; }

        public string? CaptainId { get; set; }

        [ForeignKey("ApplicationUser")]
        public virtual ApplicationUser Captain { get; set; }
    }
}
