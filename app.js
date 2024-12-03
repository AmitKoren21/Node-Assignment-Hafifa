const express = require("express");
require("dotenv").config();

const db = require("./database");
const Task = require("./models/Task");
const User = require("./models/User");

db.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

const app = express();

app.use(express.json());

Task.belongsTo(User);
User.hasMany(Task);

app.use("/users", require("./routers/UserRouter"));
app.use("/tasks", require("./routers/TaskRouter"));

const PORT = process.env.PORT || 4000;

app.listen(3000, console.log(`server running on port ${PORT}`));
