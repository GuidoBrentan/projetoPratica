using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoPratica_API.Data;
using ProjetoPratica_API.Models;

namespace ProjetoPratica_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MensagensController : Controller
    {
        public IRepostitory Repo {get;}
        public MensagensController(IRepostitory repo)
        {
            this.Repo = repo;
            //construtor
        }

        [HttpPost]
        public async Task<IActionResult> post(Mensagens modelo)
        {
            try
            {
                this.Repo.Add(modelo);

                if(await this.Repo.SaveChangesAsync())
                    return Created($"/api/mensagens/{modelo.Id}", modelo);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
            }

            return BadRequest();
        }
    }
}