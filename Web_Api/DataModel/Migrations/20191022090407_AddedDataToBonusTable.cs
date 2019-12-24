using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataModel.Migrations
{
    public partial class AddedDataToBonusTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bonus_Users_UserId",
                table: "Bonus");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Bonus",
                table: "Bonus");

            migrationBuilder.RenameTable(
                name: "Bonus",
                newName: "Bonuses");

            migrationBuilder.RenameIndex(
                name: "IX_Bonus_UserId",
                table: "Bonuses",
                newName: "IX_Bonuses_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bonuses",
                table: "Bonuses",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Bonuses",
                columns: new[] { "Id", "Award", "Expiration", "UserId" },
                values: new object[] { 1, 5, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 48 });

            migrationBuilder.AddForeignKey(
                name: "FK_Bonuses_Users_UserId",
                table: "Bonuses",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bonuses_Users_UserId",
                table: "Bonuses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Bonuses",
                table: "Bonuses");

            migrationBuilder.DeleteData(
                table: "Bonuses",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.RenameTable(
                name: "Bonuses",
                newName: "Bonus");

            migrationBuilder.RenameIndex(
                name: "IX_Bonuses_UserId",
                table: "Bonus",
                newName: "IX_Bonus_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bonus",
                table: "Bonus",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Bonus_Users_UserId",
                table: "Bonus",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
