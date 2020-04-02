var conexao = require('../config/custom-mssql');
var path = require('path');
var nomeUsuario;

module.exports = (app) => {

	app.get('/', function (request, response) { //rota raiz
		response.sendFile("Logar.html",{
			root: path.join(__dirname + "/../paginas")
		});
	});

	app.get('/cadastrar', function (request, response) { //rotas secundarias
		response.sendFile("Cadastrar.html",{
			root: path.join(__dirname + "/../paginas")
		});
	});
	
	app.get('/telaErroCadastro', function (request, response) {
		response.sendFile("telaErroCadastro.html",{
			root: path.join(__dirname + "/../paginas")
		});
	});

	app.get('/telaErroLogar', function (request, response) {
		response.sendFile("telaErroLogar.html",{
			root: path.join(__dirname + "/../paginas")
		});
	});

	function execSQL(sql, resposta) { //função que seleciona e envia para a pagina chamante
		global.conexao.request()
		.query(sql)
		.then(resultado => resposta.json(resultado.recordset))
		.catch(erro => resposta.json(erro));
	}


	app.post("/novoCadastro", async function (request, response){ //cria um novo cadastro
		var nome = request.body.usuario;
		var senha = request.body.senha;
		var confiSenha = request.body.confiSenha;
		var jaVoltou = false;

		if(senha != confiSenha){ //se senha não se confirma dá erro
			response.redirect("/telaErroCadastro");
			jaVoltou = true;
		}
		
		var sqlStr = "select * from Usuario where nome= '" + nome + "'";
		var resultado = await global.conexao.request().query(sqlStr);

		if(!(resultado.recordset.length <= 0) && !jaVoltou){ //se ja existe esse usuario da erro
			response.redirect("/telaErroCadastro");
			jaVoltou = true;
		}
		if(!jaVoltou){ //caso contrario a tudo isso, crio um novo usuario
			var sqlTxt = "insert into Usuario values('" + nome + "','" + senha + "')";
			execSQL(sqlTxt, response);
		
			response.redirect("/teste");

			nomeUsuario = nome;
		}
	});

	app.post("/verLogin", async function(req, res){ //verifico o login para entrar na tela do usuario
		var nome = req.body.usuario;
		var senha = req.body.senha;
		var existe = false;
		
		var sqlStr = "select * from Usuario where nome= '" + nome + "'";
		var resultado = await global.conexao.request().query(sqlStr);

		if(resultado.recordset.length <= 0){
			res.redirect("/cadastrar");
			existe = true;
		}
		resultado.recordset.forEach(function(item){
			if(senha == item.senha){
				res.redirect("/teste");
				existe = true;
				nomeUsuario = nome;
			}
		});
		if(!existe){
			res.redirect("/telaErroLogar");
		}
	});
	
	app.get("/retornaUsuario", function(req, res){ //retorna o usuario que está logado
		res.json({nome: nomeUsuario});
	});
}