using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoPratica_API.Data;
using ProjetoPratica_API.Models;

namespace ProjetoPratica_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PontuacaoController : Controller
    {
        public IRepostitory Repo {get;}
        public PontuacaoController(IRepostitory repo)
        {
            this.Repo = repo;
            //construtor
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await this.Repo.GetAllPontuacaoAsync();
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
            }
        }

        [HttpGet("{IdJogador}")]
        public async Task<IActionResult> Get(int IdJogador)
        {
            try
            {
                var result = await this.Repo.GetPontuacaoAsyncDeJogador(IdJogador);
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
            }
        }
    }
}