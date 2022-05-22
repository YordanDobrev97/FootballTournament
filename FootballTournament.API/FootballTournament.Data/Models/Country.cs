
namespace FootballTournament.Data.Models
{
   public class Country
    {
        public Country()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }

        public string Name { get; set; }

        public string FlagPicture { get; set; }
    }
}
