using Microsoft.EntityFrameworkCore.Migrations;

namespace DataModel.Migrations
{
    public partial class Removed_card_password_from_user : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CardPassword",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "RefreshToken",
                table: "Admins",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RefreshToken",
                table: "Admins");

            migrationBuilder.AddColumn<string>(
                name: "CardPassword",
                table: "Users",
                nullable: true);
        }
    }
}
