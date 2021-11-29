const express = require('express')
const sql = require('./mysql');

const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('API! en slash')
});

app.get('/students', async (req, res) => {
  try {
    // Esperamos a que termine de devolver los estudiantes
    // antes de retornar una respuesta
    const students = await sql.getAllStudents();
    res.send(students);
  } catch (err) {
    console.error(`Error: `, err.message);
  }
})


app.get('/api', (req, res) => {
  res.send('¡Esta es información obtenida desde tu API!')
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en puerto: ${port}`)
})
