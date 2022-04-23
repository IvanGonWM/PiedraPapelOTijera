using System.ComponentModel.DataAnnotations;

namespace PiedraPapelOTijera.Data.Model
{
    public class Elemento
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public ICollection<InfoRondas> RondasE1 { get; set; }
        public ICollection<InfoRondas> RondasE2 { get; set; }

    }
}
