using Microsoft.AspNetCore.Mvc;

namespace ProjetoPratica_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JogadorController : Controller
    {
        public JogadorController()
        {
            //construtor
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpGet("{Jogador}")]
        public IActionResult Get(string Jogador)
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult post()
        {
            return Ok();
        }

        [HttpPut("{Jogador}")]
        public IActionResult put(string Jogador)
        {
            return Ok();
        }

        [HttpDelete("{Jogador}")]
        public IActionResult delete(string Jogador)
        {
            return Ok();
        }
    }
}