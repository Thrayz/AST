using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AST.Server.Migrations
{
    /// <inheritdoc />
    public partial class newModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_TrainingPlans_TrainingPlanid",
                table: "Activities");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "TrainingPlans",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "SocialInteractions",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "TrainingPlanid",
                table: "Activities",
                newName: "TrainingPlanId");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_TrainingPlanid",
                table: "Activities",
                newName: "IX_Activities_TrainingPlanId");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "TrainingPlans",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GoalId",
                table: "TrainingPlans",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PlanDescription",
                table: "TrainingPlans",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "TrainingPlans",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TeamId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TrainingPlanId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DailyInformations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Weight = table.Column<float>(type: "real", nullable: true),
                    caloriesIntake = table.Column<float>(type: "real", nullable: true),
                    ActivityId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    UserId1 = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyInformations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DailyInformations_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DailyInformations_AspNetUsers_UserId1",
                        column: x => x.UserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TeamName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    UserId1 = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TeamId = table.Column<int>(type: "int", nullable: true),
                    ActivityId = table.Column<int>(type: "int", nullable: true),
                    DailyInformationId = table.Column<int>(type: "int", nullable: true),
                    SocialInteractionId = table.Column<int>(type: "int", nullable: true),
                    NotificationType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NotificationStatus = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notifications_AspNetUsers_UserId1",
                        column: x => x.UserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notifications_DailyInformations_DailyInformationId",
                        column: x => x.DailyInformationId,
                        principalTable: "DailyInformations",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notifications_SocialInteractions_SocialInteractionId",
                        column: x => x.SocialInteractionId,
                        principalTable: "SocialInteractions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Notifications_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrainingPlans_GoalId",
                table: "TrainingPlans",
                column: "GoalId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_TeamId",
                table: "AspNetUsers",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_TrainingPlanId",
                table: "AspNetUsers",
                column: "TrainingPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyInformations_ActivityId",
                table: "DailyInformations",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyInformations_UserId1",
                table: "DailyInformations",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ActivityId",
                table: "Notifications",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_DailyInformationId",
                table: "Notifications",
                column: "DailyInformationId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_SocialInteractionId",
                table: "Notifications",
                column: "SocialInteractionId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_TeamId",
                table: "Notifications",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId1",
                table: "Notifications",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_TrainingPlans_TrainingPlanId",
                table: "Activities",
                column: "TrainingPlanId",
                principalTable: "TrainingPlans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Teams_TeamId",
                table: "AspNetUsers",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_TrainingPlans_TrainingPlanId",
                table: "AspNetUsers",
                column: "TrainingPlanId",
                principalTable: "TrainingPlans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingPlans_Goals_GoalId",
                table: "TrainingPlans",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_TrainingPlans_TrainingPlanId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Teams_TeamId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_TrainingPlans_TrainingPlanId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingPlans_Goals_GoalId",
                table: "TrainingPlans");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "DailyInformations");

            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_TrainingPlans_GoalId",
                table: "TrainingPlans");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_TeamId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_TrainingPlanId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "TrainingPlans");

            migrationBuilder.DropColumn(
                name: "GoalId",
                table: "TrainingPlans");

            migrationBuilder.DropColumn(
                name: "PlanDescription",
                table: "TrainingPlans");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "TrainingPlans");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "TrainingPlanId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "TrainingPlans",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "SocialInteractions",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "TrainingPlanId",
                table: "Activities",
                newName: "TrainingPlanid");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_TrainingPlanId",
                table: "Activities",
                newName: "IX_Activities_TrainingPlanid");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_TrainingPlans_TrainingPlanid",
                table: "Activities",
                column: "TrainingPlanid",
                principalTable: "TrainingPlans",
                principalColumn: "id");
        }
    }
}
