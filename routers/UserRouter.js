const express = require("express");

const User = require("../models/User");
const Task = require("../models/Task");
const { DataTypes, Model } = require("sequelize");
const { getUserById } = require("../controllers/UserController");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.findAndCountAll({
      limit: 5,
      include: Task,
    });

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userResponse = await getUserById(req.params.id);

    if (!userResponse instanceof Model) {
      res.status(404).json(userResponse);
    } else {
      res.status(200).json(userResponse);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.name || !req.body.email) {
      res.status(400).json("can't create user without name or email field");
    } else {
      const user = await User.create(req.body);

      res.status(201).json(user);
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userResponse = await getUserById(req.params.id);

    if (!userResponse instanceof Model) {
      res.status(404).json(userResponse);
    } else {
      userResponse.name = req.body.name || userResponse.name;
      userResponse.email = req.body.email || userResponse.email;
      userResponse.updatedAt = DataTypes.NOW();
      await userResponse.save();

      res.status(200).json(`user with id ${req.params.id} updated successfuly`);
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userResponse = await getUserById(req.params.id);

    if (!(userResponse instanceof Model)) {
      res.status(404).json(userResponse);
    } else {
      await User.destroy({ where: { id: req.params.id } });

      res.status(200).json(`user with id ${req.params.id} deleted`);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
