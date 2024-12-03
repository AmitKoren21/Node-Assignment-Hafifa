const express = require("express");

const User = require("../models/User");
const Task = require("../models/Task");
const { DataTypes } = require("sequelize");

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
    const user = await User.findOne({
      where: { id: req.params.id },
      include: Task,
    });

    if (user === null) {
      res.status(404).json(`no user with id ${req.params.id} found`);
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    if (!body.name || !body.email) {
      res.status(400).json("can't create user without name or email field");
    } else {
      const user = await User.create(body);

      res.status(201).json(user);
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (user === null) {
      res.status(404).json(`no user with id ${req.params.id} found`);
    } else {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.updatedAt = DataTypes.NOW();
      await user.save();

      res.status(200).json(`user with id ${req.params.id} updated successfuly`);
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });

    res.status(200).json(`user with id ${req.params.id} deleted`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
