using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PiedraPapelOTijera.Migrations
{
    public partial class saveDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Elemento",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Elemento", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Partida",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Jugador1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Jugador2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ganador = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partida", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Gana",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ElementoId = table.Column<int>(type: "int", nullable: false),
                    GanaContraId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gana", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Gana_Elemento_ElementoId",
                        column: x => x.ElementoId,
                        principalTable: "Elemento",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Gana_Elemento_GanaContraId",
                        column: x => x.GanaContraId,
                        principalTable: "Elemento",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Rondas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ronda = table.Column<int>(type: "int", nullable: false),
                    PartidaId = table.Column<int>(type: "int", nullable: false),
                    Elemento1Id = table.Column<int>(type: "int", nullable: false),
                    Elemento2Id = table.Column<int>(type: "int", nullable: false),
                    ElementoGanador = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rondas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rondas_Elemento_Elemento1Id",
                        column: x => x.Elemento1Id,
                        principalTable: "Elemento",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Rondas_Elemento_Elemento2Id",
                        column: x => x.Elemento2Id,
                        principalTable: "Elemento",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Rondas_Partida_PartidaId",
                        column: x => x.PartidaId,
                        principalTable: "Partida",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Gana_ElementoId",
                table: "Gana",
                column: "ElementoId");

            migrationBuilder.CreateIndex(
                name: "IX_Gana_GanaContraId",
                table: "Gana",
                column: "GanaContraId");

            migrationBuilder.CreateIndex(
                name: "IX_Rondas_Elemento1Id",
                table: "Rondas",
                column: "Elemento1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Rondas_Elemento2Id",
                table: "Rondas",
                column: "Elemento2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Rondas_PartidaId",
                table: "Rondas",
                column: "PartidaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Gana");

            migrationBuilder.DropTable(
                name: "Rondas");

            migrationBuilder.DropTable(
                name: "Elemento");

            migrationBuilder.DropTable(
                name: "Partida");
        }
    }
}
