"use strict";

const User = require("../models/User");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/express-codealong", {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const usersArr = [
  {
    username: "estherbernal",
    password: "abc",
    name: "Esther",
    email: "Action",
    phone: "1234"
  },
  {
    username: "vairojarela",
    password: "abc",
    name: "Jairo",
    email: "Action",
    phone: "1234"
  },
  {
    username: "danielsousa",
    password: "abc",
    name: "Dani",
    email: "Comedy",
    phone: "1234"
  }
];
/* const celebritiesArr = [
  {
    name: 'George Clooney',
    occupation: 'Actor',
    catchPhrase: "It's me, baby."
  },
  {
    name: 'Justin Bieber',
    occupation: 'Popstar',
    catchPhrase: "I'm the Beaver"
  },
  {
    name: 'Aretha Franklin',
    occupation: 'Singer',
    catchPhrase: 'AAAAAAAAAH'
  }
]; */

/* Celebrity.create(celebritiesArr).then((data) => {
  console.log(data);
  mongoose.connection.close();
  ;
}).catch((error) => console.error(error)); */

User.create(usersArr)
  .then(data => {
    console.log(data);
    mongoose.connection.close();
  })
  .catch(error => console.error(error));
