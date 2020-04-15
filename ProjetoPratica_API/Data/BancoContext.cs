using Microsoft.EntityFrameworkCore;
using ProjetoPratica_API.Models;

namespace ProjetoPratica_API.Data
{
    public class BancoContext : DbContext
    {
        public BancoContext(DbContextOptions<BancoContext> options): base (options)
        {

        }

        public DbSet<Jogador> Jogador {get; set;}
        public DbSet<Pontuacao> Pontuacaos{get; set;}
    }
}