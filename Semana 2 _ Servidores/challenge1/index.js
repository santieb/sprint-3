const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
   res.send('¡Esta es información obtenida desde tu API!')
});

app.get('/version', (req, res) => {
  res.send('Version inicial')
});

app.listen(port, () => {
  console.log(`Aplicacion escuchando en puerto: ${port}`);
})

