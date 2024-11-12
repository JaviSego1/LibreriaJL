require('dotenv').config({ path: 'stack/.env' });
const mysql = require('mysql2');

const db = mysql.createConnection({
  host:         process.env.MYSQL_HOST,
  port:         process.env.MYSQL_PORT,
  user:         process.env.MYSQL_USERNAME,
  password:     process.env.MYSQL_ROOT_PASSWORD,
  database:     process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
  } else {
    console.log('Conexión exitosa a MySQL');
  }
});

module.exports = db;