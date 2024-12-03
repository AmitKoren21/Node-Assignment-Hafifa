const Sequelize = require("sequelize");
const db = require("../database");

const Task = db.define("tasks", {
  id: {
    type: Sequelize.UUIDV4,
    defaultValue: db.uuidV4,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.ENUM,
    values: ["pending", "in_progress", "completed"],
    allowNull: false,
    defaultValue: "pending",
  },
  dueDate: {
    type: Sequelize.DATE,
  },
});

module.exports = Task;
