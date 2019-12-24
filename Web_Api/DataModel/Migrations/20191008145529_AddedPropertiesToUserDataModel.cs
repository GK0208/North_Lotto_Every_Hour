using Microsoft.EntityFrameworkCore.Migrations;

namespace DataModel.Migrations
{
    public partial class AddedPropertiesToUserDataModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Balance",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CardHolder",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CardNumber",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CardPassword",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsSubscribed",
                table: "Users",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Balance",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CardHolder",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CardNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CardPassword",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsSubscribed",
                table: "Users");
        }
    }
}
