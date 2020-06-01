namespace ProjetoPratica_API.Models
{
    public class Jogador
    {
        public int Id {get; set; }
        public string usuario {get; set; }
        public string nome {get; set; }
        public string email {get; set; }
        public string senha {get; set; }
        public int pontos {get; set; }
    }
}