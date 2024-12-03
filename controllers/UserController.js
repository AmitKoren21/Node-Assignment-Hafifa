const User = require("../models/User");
const Task = require("../models/Task");

const getTasks = async () => {
  
}

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id: id },
    include: Task,
  });

  if (user === null) {
    return `no user with id ${id} found`;
  } else {
    return user;
  }
};

module.exports = {getUserById};
