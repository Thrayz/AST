using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AST.Server.Migrations
{
    /// <inheritdoc />
    public partial class abullshit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goals_AspNetUsers_UserId1",
                table: "Goals");

            migrationBuilder.DropIndex(
                name: "IX_Goals_UserId1",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Goals");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Goals",
                newName: "start");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Goals",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "finish",
                table: "Goals",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Goals_UserId",
                table: "Goals",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_AspNetUsers_UserId",
                table: "Goals",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goals_AspNetUsers_UserId",
                table: "Goals");

            migrationBuilder.DropIndex(
                name: "IX_Goals_UserId",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "finish",
                table: "Goals");

            migrationBuilder.RenameColumn(
                name: "start",
                table: "Goals",
                newName: "Date");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Goals",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "Goals",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Goals_UserId1",
                table: "Goals",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_AspNetUsers_UserId1",
                table: "Goals",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
