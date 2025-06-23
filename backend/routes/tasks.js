const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const task = await Task.create({ title: req.body.title });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await Task.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

module.exports = router;
