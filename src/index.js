require("dotenv").config();

const app = require("./server");
require("./database");

//console.log(process.env.TEST)

app.listen(app.get("port"), () => {
  console.log("servidor corriedo en http://localhost:", app.get("port"));
});
