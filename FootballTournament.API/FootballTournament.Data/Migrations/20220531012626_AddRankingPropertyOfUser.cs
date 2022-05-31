using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootballTournament.Data.Migrations
{
    public partial class AddRankingPropertyOfUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Ranking",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ranking",
                table: "AspNetUsers");
        }
    }
}
