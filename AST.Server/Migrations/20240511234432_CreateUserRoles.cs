using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AST.Server.Migrations
{
    /// <inheritdoc />
    public partial class CreateUserRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO AspNetRoles (Id, Name, NormalizedName) VALUES ('1', 'User', 'USER')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
