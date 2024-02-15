using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace techconnect.Migrations
{
    /// <inheritdoc />
    public partial class UserSkillAndTicketSkill : Migration
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
                name: "Skills",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "TechId",
                table: "Skills");

            migrationBuilder.CreateTable(
                name: "TicketSkills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TicketId = table.Column<int>(type: "int", nullable: false),
                    SkillId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketSkills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TicketSkills_Skills_SkillId",
                        column: x => x.SkillId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TicketSkills_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserSkills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SkillId = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    TechId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSkills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSkills_AspNetUsers_TechId",
                        column: x => x.TechId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSkills_Skills_SkillId",
                        column: x => x.SkillId,
                        principalTable: "Skills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TicketSkills_SkillId",
                table: "TicketSkills",
                column: "SkillId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketSkills_TicketId",
                table: "TicketSkills",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSkills_SkillId",
                table: "UserSkills",
                column: "SkillId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSkills_TechId",
                table: "UserSkills",
                column: "TechId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TicketSkills");

            migrationBuilder.DropTable(
                name: "UserSkills");

            migrationBuilder.AddColumn<string>(
                name: "Skills",
                table: "Tickets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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
