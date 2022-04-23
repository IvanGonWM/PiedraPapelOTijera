using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PiedraPapelOTijera.Data.Model
{
    public class InfoRondas
    {
        [Key]
        public int Id { get; set; }
        public int Ronda { get; set; }
        public int PartidaId { get; set; }
        public Partida Partida { get; set; }
        public int? Elemento1Id { get; set; }
        public int? Elemento2Id { get; set; }
        [ForeignKey("Elemento1Id")]
        public Elemento Elemento1 { get; set; }
        [ForeignKey("Elemento2Id")]
        public Elemento Elemento2 { get; set; }
        public int ElementoGanador { get; set; }
    }
}