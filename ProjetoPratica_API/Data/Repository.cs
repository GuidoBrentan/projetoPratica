using System.Linq;
using System.Threading.Tasks;
using ProjetoPratica_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ProjetoPratica_API.Data
{
    public class Repository : IRepostitory
    {
        public BancoContext Context { get; }
        public Repository(BancoContext context)
        {
            this.Context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            //throw new System.NotImplementedException();
            this.Context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            //throw new System.NotImplementedException();
            this.Context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            //throw new System.NotImplementedException();
            return(await this.Context.SaveChangesAsync() > 0);
        }

        public void Update<T>(T entity) where T : class
        {
            //throw new System.NotImplementedException();
            this.Context.Update(entity);
        }

        public async Task<Jogador[]> GetAllJogadoresAsync()
        {
            //throw new System.NotImplementedException();
            //Retornar para uma query qualquer tipo de jogador
            IQueryable<Jogador> consultaJogadores = this.Context.Jogador;

            consultaJogadores = consultaJogadores.OrderBy(a => a.nome);

            return await consultaJogadores.ToArrayAsync();
        }

        public async Task<Jogador> GetAllJogadoresAsyncById(int Id)
        {
            //throw new System.NotImplementedException();
            //Retornar para uma query qualquer jogador
            IQueryable<Jogador> consultaJogadores = this.Context.Jogador;

            consultaJogadores = consultaJogadores.OrderBy(a => a.nome).Where(jogador => jogador.Id == Id);

            //aqui efetivamente ocorre o select no BD
            return await consultaJogadores.FirstOrDefaultAsync();
        }

        public async Task<Jogador> GetAllJogadoresAsyncByUsuario(string usuario)
        {
            //throw new System.NotImplementedException();
            //Retornar para uma query qualquer jogador
            IQueryable<Jogador> consultaJogadores = this.Context.Jogador;

            consultaJogadores = consultaJogadores.OrderBy(a => a.nome).Where(jogador => jogador.usuario == usuario);

            //aqui efetivamente ocorre o select no BD
            return await consultaJogadores.FirstOrDefaultAsync();
        }

        public async Task<Pontuacao[]> GetAllPontuacaoAsync()
        {
            //throw new System.NotImplementedException();
            //Retornar para uma query qualquer tipo de jogador
            IQueryable<Pontuacao> consultaPontos = this.Context.Pontuacao;

            consultaPontos = consultaPontos.OrderBy(a => a.Id);

            return await consultaPontos.ToArrayAsync();
        }

        public async Task<Pontuacao> GetPontuacaoAsyncDeJogador(int codJogador)
        {
            //throw new System.NotImplementedException();
            //Retornar para uma query qualquer jogador
            IQueryable<Pontuacao> consultaPontos = this.Context.Pontuacao;

            consultaPontos = consultaPontos.Where(pontuacao => pontuacao.codJogador == codJogador);

            //aqui efetivamente ocorre o select no BD
            return await consultaPontos.FirstOrDefaultAsync();
        }
    }
}