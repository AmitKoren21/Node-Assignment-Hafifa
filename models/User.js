const Sequelize = require("sequelize");
const db = require("../database");

const User = db.define("users", {
  id: {
    type: Sequelize.UUIDV4,
    defaultValue: db.uuidV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = User;
