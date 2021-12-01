const express = require('express');
const mongo = require('./mongodb');
const redis = require('redis');

const app = express();
const port = 3000;

const redisClient = redis.createClient({
  host: process.env.ELASTICACHE_URL,
  port: 6379
});


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
  const userRedisKey = "User";
  redisClient.get(userRedisKey, async (error, result) => {
    // Si hay error, lo devolvemos
    if (error) {
      res.json(error);
    }
    // Si hay algún resultado, quiere decir que fue obtenido desde Redis
    // En este caso, lo devolvemos sin más
    if (result) {
      res.json(result);
    } else {
      // Si no se encontró nada en Redis, se busca en la DB
      let user = await mongo.searchJuan();
      // Y se guarda en Redis para que esté disponible en la próxima llamada
      redisClient.set(userRedisKey, JSON.stringify(user));
      res.send(user);
    }
  });
});

app.get('/deleteCache' , async (req, res) => {
  try {
    redisClient.flushall();
    res.redirect(307, '/redis-api/users');
    } catch (err) {
      console.error(`Error: `, err.message);
      }
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en puerto: ${port}`)
});

