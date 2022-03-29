using System.ComponentModel.DataAnnotations;

namespace PiedraPapelOTijera.Data.Model
{
    public class InfoRondas
    {
        [Key]
        public int id { get; set; }
        public int Ronda { get; set; }

        public string? Ganador { get; set; }
    }
}