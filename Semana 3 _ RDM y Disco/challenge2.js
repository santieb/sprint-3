require('dotenv').config();
const mongoose = require('mongoose');
const schema = { name: String, lastName: String, age: Number }
const Users = mongoose.model("Usuarios", schema);

const uri = process.env.MONGO_ATLAS_URL;

mongoose.connect(uri);

