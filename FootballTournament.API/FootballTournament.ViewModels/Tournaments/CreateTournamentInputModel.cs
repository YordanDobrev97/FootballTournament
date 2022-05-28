
using System.ComponentModel;

namespace FootballTournament.ViewModels.Tournaments
{
    public class CreateTournamentInputModel
    {
        public string Name { get; set; }

        public string Country { get; set; }

        public string Category { get; set; }

        public decimal Price { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }
    }
}
