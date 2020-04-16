namespace ProjetoPratica_API.Models
{
    public class Jogador
    {
        public int codJogador {get; set; }
        public string usuario {get; set; }
        public string nome {get; set; }
        public string email {get; set; }
        public string senha {get; set; }
        public char estaConect {get; set; }
    }
}