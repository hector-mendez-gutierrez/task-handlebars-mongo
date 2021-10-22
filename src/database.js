const mongoose = require("mongoose");

const { MONGO_HOST, MONGO_DATABASE } = process.env;
const URL = `mongodb://${MONGO_HOST}/${MONGO_DATABASE}`;

mongoose
  .connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    //useCreateIndex: true,
  })
  .then((db) => console.log("Conectado a la base de datos!"))
  .catch((err) => console.log("Error al conectar a la base de datos :(", err));
