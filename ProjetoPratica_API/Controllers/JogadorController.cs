using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoPratica_API.Data;
using ProjetoPratica_API.Models;

namespace ProjetoPratica_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JogadorController : Controller
    {
        public IRepostitory Repo {get;}
        public JogadorController(IRepostitory repo)
        {
            this.Repo = repo;
            //construtor
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await this.Repo.GetAllJogadoresAsync();
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
            }
        }

        [HttpGet("{JogadorId}")]
        public async Task<IActionResult> Get(int JogadorId)
        {
            try
            {
                var result = await this.Repo.GetAllJogadoresAsyncById(JogadorId);
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
            }
        }

        [HttpGet("getJogadoresbyUsuario/{Usuario}")]
        public async Task<IActionResult> Get(string Usuario)
        {
            try
            {
                var result = await this.Repo.GetAllJogadoresAsyncByUsuario(Usuario);
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
            }
        }

        [HttpPost]
        public async Task<IActionResult> post(Jogador modelo)
        {
            try
            {
                this.Repo.Add(modelo);

                if(await this.Repo.SaveChangesAsync())
                    return Created($"/api/jogador/{modelo.Id}", modelo);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
            }

            return BadRequest();
        }

        [HttpPut("{JogadorId}")]
        public async Task<IActionResult> put ([FromBody] Jogador jogador)
        {
            try
            {
                this.Repo.Update(jogador);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
            }

            //retorna BadRequest caso não consiga alterar
            return BadRequest();
        }

        [HttpDelete("{JogadorId}")]
        public async Task<IActionResult> delete(int JogadorId)
        {
            try
            {
                //verifica se existe o jogador a ser exclucodJogadoro
                var jogador = await this.Repo.GetAllJogadoresAsyncById(JogadorId);
                if(jogador == null)
                    return NotFound();

                this.Repo.Delete(jogador);

                if(await this.Repo.SaveChangesAsync())
                    return Ok();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
            }

            return BadRequest();
        }
    }
}