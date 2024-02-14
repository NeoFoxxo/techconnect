using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace techconnect.Migrations
{
    /// <inheritdoc />
    public partial class UserSkills : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Skills_AspNetUsers_TechId",
                table: "Skills");

            migrationBuilder.DropIndex(
                name: "IX_Skills_TechId",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "TechId",
                table: "Skills");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Skills",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserSkill",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SkillId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    TechId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSkill", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSkill_AspNetUsers_TechId",
                        column: x => x.TechId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSkill_Skills_SkillId",
                        column: x => x.SkillId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Skills_AppUserId",
                table: "Skills",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSkill_SkillId",
                table: "UserSkill",
                column: "SkillId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSkill_TechId",
                table: "UserSkill",
                column: "TechId");

            migrationBuilder.AddForeignKey(
                name: "FK_Skills_AspNetUsers_AppUserId",
                table: "Skills",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Skills_AspNetUsers_AppUserId",
                table: "Skills");

            migrationBuilder.DropTable(
                name: "UserSkill");

            migrationBuilder.DropIndex(
                name: "IX_Skills_AppUserId",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Skills");

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Skills",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TechId",
                table: "Skills",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Skills_TechId",
                table: "Skills",
                column: "TechId");

            migrationBuilder.AddForeignKey(
                name: "FK_Skills_AspNetUsers_TechId",
                table: "Skills",
                column: "TechId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
