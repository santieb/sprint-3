const express = require('express');
const mongo = require('./mongodb');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('API! en slash');
});

app.post('/users', async (req, res) => {
  try {
    await mongo.addNewUser();
    res.sendStatus(200);
  } catch (err) {
    console.error(`Error: `, err.message);
  }
})

app.get('/users', async (req, res) => {
  try {
    let users = await mongo.getAllUsers();
    res.send(users);
  } catch (err) {
    console.error(`Error: `, err.message);
  }
});

app.get('/searchJuan', async (req, res) => {
  try {
    let juan = await mongo.searchJuan();
    res.send(juan);
  } catch (err) {
    console.error(`Error: `, err.message);
  }
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en puerto: ${port}`)
});

