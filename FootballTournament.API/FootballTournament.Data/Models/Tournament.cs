
namespace FootballTournament.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Tournament
    {
        public Tournament()
        {
            this.Teams = new HashSet<Team>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }


        [ForeignKey("Country")]
        public string CountryId { get; set; }

        public Country Country { get; set; }

        public Category Category { get; set; }

        public decimal Price { get; set; }

        public ICollection<Team> Teams { get; set; }

        public int? WinnerId { get; set; }

        public virtual Team Winner { get; set; }

        public DateTime StartDate { get; set;  }

        public DateTime EndDate { get; set; }

    }
}
