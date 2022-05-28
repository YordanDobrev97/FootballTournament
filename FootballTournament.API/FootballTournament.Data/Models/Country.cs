namespace FootballTournament.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Country
    {
        public Country()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string FlagPicture { get; set; }
    }
}
