const Task = require("../models/Task");

const getTaskById = async (id) => {
  const task = await Task.findOne({
    where: { id: id },
  });

  if (task === null) {
    return `no task with id ${id} found`;
  } else {
    return task;
  }
};

module.exports = {getTaskById};
