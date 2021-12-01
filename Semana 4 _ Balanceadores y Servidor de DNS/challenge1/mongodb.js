require('dotenv').config({ path: '../../.env' })
const mongoose = require('mongoose');
const schema = { name: String, lastName: String, age: Number }
const Users = mongoose.model("Usuarios", schema);

const uri = process.env.MONGO_ATLAS_URL;

mongoose.connect(uri);

const addNewUser = async () => {
  const newPerson = { name: "Juan", lastName: "Perez", age: 24 };
  let newUser = new Users(newPerson);

  await newUser.save();
}

const searchJuan = async () => await Users.findOne({ name: "Juan" });
const getAllUsers = async () => await Users.find();

module.exports = {
 addNewUser,
 searchJuan,
 getAllUsers
}
