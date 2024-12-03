const express = require("express");

const Task = require("../models/Task");
const { DataTypes } = require("sequelize");

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
    const task = await Task.findOne({
      where: { id: req.params.id },
    });

    if (task === null) {
      res.status(404).json(`no task with id ${req.params.id} found`);
    } else {
      res.status(200).json(task);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    if (!body.title) {
      res.status(400).json("can't create task without a title");
    } else {
      const task = await Task.create(body);

      res.status(201).json(task);
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id } });

    if (task === null) {
      res.status(404).json(`no task with id ${req.params.id} found`);
    } else {
      task.title = req.body.title || task.title;
      task.updatedAt = DataTypes.NOW();
      await task.save();

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
