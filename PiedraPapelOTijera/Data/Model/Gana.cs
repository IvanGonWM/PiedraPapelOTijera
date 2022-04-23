using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PiedraPapelOTijera.Data.Model
{
    public class Gana
    {
        [Key]
        public int Id { get; set; }
        public int ElementoId { get; set; }
        public int GanaContraId { get; set; }
        [ForeignKey("ElementoId")]
        public Elemento Elemento { get; set; }
        [ForeignKey("GanaContraId")]
        public Elemento GanaContra { get; set; }
    }
}
