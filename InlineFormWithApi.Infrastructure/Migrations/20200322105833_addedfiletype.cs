using Microsoft.EntityFrameworkCore.Migrations;

namespace InlineFormWithApi.Infrastructure.Migrations
{
    public partial class addedfiletype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageFileType",
                table: "UserDetails",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageFileType",
                table: "UserDetails");
        }
    }
}
