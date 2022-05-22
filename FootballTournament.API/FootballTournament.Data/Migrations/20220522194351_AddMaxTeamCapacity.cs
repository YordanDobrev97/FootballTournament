using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootballTournament.Data.Migrations
{
    public partial class AddMaxTeamCapacity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MaxCapacity",
                table: "Teams",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxCapacity",
                table: "Teams");
        }
    }
}
