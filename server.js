require('dotenv').config(); //importa o dotenv, config inicializa o dotenv;
const express = require('express'); //imoirto o express para o projeto
const server = express(); //
const Routes = require('./src/routes/routes')
const cors = require('cors');
const mongodb = require('./src/database/mongodb');//importa arquivo conexao do mongodb

mongodb(); //inicializa o mongodb

server.use(cors(
    {//configuracoes do cors
      origin: '*',
      methods: ['GET','POST', 'DELETE', 'PUT', 'UPDATE', 'PATCH'],
      allowedHeaders: ['Content-type']
    }
));
//requisicoes seram convertidas ou comparadas em json
server.use(express.json());
//o body das requisicoes devem estar no 
server.use(express.urlencoded({extended: true}));

server.use('/', Routes);

server.listen(process.env.PORT, () => {
  console.log(`Serveder roda na porta ${process.env.PORT} no endereco ${process.env.BASE}`)
});