using Microsoft.AspNetCore.Mvc;
using PiedraPapelOTijera.APIModels;
using PiedraPapelOTijera.Data;
using PiedraPapelOTijera.Data.Model;

namespace PiedraPapelOTijera.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FacadeController : ControllerBase
    {
        private readonly Context _context;

        public FacadeController(Context context)
        {
            _context = context;
        }

        [HttpPost("partida")]
        public async Task<JsonResult> NuevaPartida([FromBody] Partida partida)
        {
            _context.Partida.Add(partida);

            await _context.SaveChangesAsync();

            return new JsonResult(partida);
        }

        [HttpPost("ronda")]
        public async Task<GanadorRonda> NuevaRonda([FromBody] CrearRondaModel crearRonda)
        {
            int elementoTemp1 = _context.Elemento.First(e => e.Nombre == crearRonda.Elemento1).Id;
            int elementoTemp2 = _context.Elemento.First(e => e.Nombre == crearRonda.Elemento2).Id;

            int ganadorRonda = 0;
            var partida = _context.Partida.FirstOrDefault(e => e.Id == crearRonda.PartidaId);
            string nombreGanador = "";
            bool finalPartida = false;

            if (_context.Gana.Any(e => e.ElementoId == elementoTemp1 && e.GanaContraId == elementoTemp2))
            {
                ganadorRonda = 1;
                nombreGanador = partida.Jugador1;
            }
            else if (_context.Gana.Any(e => e.ElementoId == elementoTemp2 && e.GanaContraId == elementoTemp1))
            {
                ganadorRonda = 2;
                nombreGanador = partida.Jugador2;
            }

            _context.Rondas.Add(new Data.Model.InfoRondas()
            {
                Ronda = crearRonda.Ronda,
                Elemento1Id = elementoTemp1,
                Elemento2Id = elementoTemp2,
                PartidaId = crearRonda.PartidaId,
                ElementoGanador = ganadorRonda,
            });

            await _context.SaveChangesAsync();

            if (ganadorRonda != 0 && _context.Rondas.Count(e => e.PartidaId == crearRonda.PartidaId && e.ElementoGanador == ganadorRonda) == 3)
            {
                finalPartida = true;
                partida.Ganador = ganadorRonda;
                await _context.SaveChangesAsync();
            }

            return new GanadorRonda { Ganador = nombreGanador, Final = finalPartida };
        }

        [HttpGet("jugadas")]
        public IEnumerable<Elemento> Get()
        {
            return _context.Elemento;
        }

        [HttpPost("jugadas")]
        public async Task<JsonResult> Crear([FromBody] CrearJugadaModel crearJugada)
        {
            var elem1 = _context.Elemento.FirstOrDefault(e => e.Nombre == crearJugada.Elemento1);
            if (elem1 == null)
                _context.Elemento.Add(new Elemento { Nombre = crearJugada.Elemento1 });

            var elem2 = _context.Elemento.FirstOrDefault(e => e.Nombre == crearJugada.Elemento2);
            if (elem2 == null)
                _context.Elemento.Add(new Elemento { Nombre = crearJugada.Elemento2 });

            await _context.SaveChangesAsync();

            if (!(elem1 != null &&
                  elem2 != null &&
                 (_context.Gana.Any(e => e.ElementoId == elem1.Id && e.GanaContraId == elem2.Id) ||
                 _context.Gana.Any(e => e.ElementoId == elem2.Id && e.GanaContraId == elem1.Id))))
            {
                _context.Gana.Add(new Gana
                {
                    ElementoId = _context.Elemento.First(e => e.Nombre == crearJugada.Elemento1).Id,
                    GanaContraId = _context.Elemento.First(e => e.Nombre == crearJugada.Elemento2).Id
                });
            }

            await _context.SaveChangesAsync();

            return new JsonResult(true);
        }
    }
}