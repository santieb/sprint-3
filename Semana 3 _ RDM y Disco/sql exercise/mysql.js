require('dotenv').config();
const mysql = require('mysql2/promise');

exports.getAllStudents = async function getAllStudents() {
  // Establece la conexión con la DB
  const con = await mysql.createConnection({
    host: process.env.RDS_MYSQL_HOST,
    user: process.env.RDS_MYSQL_USER,
    password: process.env.RDS_MYSQL_PASS,
    database: process.env.RDS_MYSQL_DB_NAME
  });

  // Query/Consulta para traer TODOS los estudiantes
  const query = "SELECT * FROM Students";
  const [results,] = await con.execute(query, null);

  return results;
}

