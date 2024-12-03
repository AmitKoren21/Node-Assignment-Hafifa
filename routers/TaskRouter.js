const express = require("express");

const Task = require("../models/Task");
const { DataTypes, Model } = require("sequelize");
const { getTaskById } = require("../controllers/TaskController");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAndCountAll({ limit: 3 });

    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const taskResponse = await getTaskById(req.params.id);

    if (!taskResponse instanceof Model) {
      res.status(404).json(taskResponse);
    } else {
      res.status(200).json(taskResponse);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(400).json("can't create task without a title");
    } else {
      const task = await Task.create(req.body);

      res.status(201).json(task);
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const taskResponse = await getTaskById(req.params.id);

    if (!taskResponse instanceof Model) {
      res.status(404).json(taskResponse);
    } else {
      taskResponse.title = req.body.title || taskResponse.title;
      taskResponse.updatedAt = DataTypes.NOW();
      await taskResponse.save();

      res.status(200).json(`task with id ${req.params.id} updated successfuly`);
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Task.destroy({ where: { id: req.params.id } });

    res.status(200).json(`task with id ${req.params.id} deleted`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
