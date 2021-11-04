const express = require('express');
const app = express();
const port = 3000;
const host = 'http://localhost';
const url = `${host}:${port}`;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', function (req, res) {
    res.json('funciona');
});
app.listen(port, () => {
    console.log(`Servidor iniciado en ${url}`);
});
