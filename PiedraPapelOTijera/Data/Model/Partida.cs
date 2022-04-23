using System.ComponentModel.DataAnnotations;

namespace PiedraPapelOTijera.Data.Model
{
    public class Partida
    {
        [Key]
        public int Id { get; set; }
        public string Jugador1 { get; set; }
        public string Jugador2 { get; set; }
        public int Ganador { get; set; }
        public List<InfoRondas> Rondas { get; set; }
    }
}
