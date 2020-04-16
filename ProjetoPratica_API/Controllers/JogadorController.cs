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

        [HttpGet("{Jogador}")]
        public async Task<IActionResult> Get(int codJogador)
        {
            try
            {
                var result = await this.Repo.GetAllJogadoresAsyncByCod(codJogador);
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
                    return Created($"/api/jogador/{modelo.codJogador}", modelo);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
            }

            return BadRequest();
        }

        [HttpPut("{Jogador}")]
        public async Task<IActionResult> put(int codJogador, Jogador modelo)
        {
            try
            {
                //verifica se existe jogador a ser alterado
                var jogador = await this.Repo.GetAllJogadoresAsyncByCod(codJogador);
                
                if(jogador == null)
                    return NotFound();

                this.Repo.Update(modelo);

                if(await this.Repo.SaveChangesAsync())
                {
                    //return Ok();
                    //pegar o jogador novamente, agora alterado, para devolver na rota abaixo
                    jogador = await this.Repo.GetAllJogadoresAsyncByCod(codJogador);
                    return Created($"/api/jogador/{modelo.nome}", jogador);
                }
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
            }

            //retorna BadRequest caso não consiga alterar
            return BadRequest();
        }

        [HttpDelete("{Jogador}")]
        public async Task<IActionResult> delete(int codJogador)
        {
            try
            {
                //verifica se existe o jogador a ser exclucodJogadoro
                var jogador = await this.Repo.GetAllJogadoresAsyncByCod(codJogador);
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