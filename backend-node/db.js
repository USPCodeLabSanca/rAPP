import mysql from 'mysql2/promise';

//IMPORTANTE:
//Se quiserem mudar o banco de dados, precisarão alterar aqui
//Esse é o banco de dados que está no meu PC
// Cria o pool de conexões com as credenciais do seu MySQL local
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Fm4463!#',
  database: 'rapp_users'
});

export default connection;