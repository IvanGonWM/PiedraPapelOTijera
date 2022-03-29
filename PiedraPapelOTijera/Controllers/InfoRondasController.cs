using Microsoft.AspNetCore.Mvc;
using PiedraPapelOTijera.Data;

namespace PiedraPapelOTijera.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InfoRondasController : ControllerBase
    {
        private readonly Context _context;

        public InfoRondasController(Context context)
        {
            _context = context;
        }


        [HttpGet]
        public IEnumerable<InfoRondas> Get()
        {
            return _context.IRondas.Select(i => new InfoRondas
            {
                Ganador = i.Ganador,
                Ronda = i.Ronda,
            });
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody]InfoRondas info)
        {
            _context.IRondas.Add(new Data.Model.InfoRondas
            {
                Ganador = info.Ganador,
                Ronda = info.Ronda,

            });
            await _context.SaveChangesAsync();
            return Ok(info);
        }

    }
}