var mssql = require('mssql');

const config = {
	user: 'BD19175',
	password: 'guidomotoca45',
	server: 'regulus.cotuca.unicamp.br',
	database: 'STOP'
};


mssql.connect(config)
	.then(conexao => global.conexao = conexao)
	.catch(erro => console.log(erro));


module.exports = mssql;



