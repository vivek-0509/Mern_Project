import { validationResult } from 'express-validator';
import { Task } from '../models/Task.js';

export const listTasks = async (req, res) => {
  const category = (req.query.category || '').trim();
  const filter = { userId: req.user.id };
  if (category) filter.category = category;
  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  return res.json(
    tasks.map((t) => ({ id: String(t._id), title: t.title, category: t.category, isDone: t.isDone }))
  );
};

export const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { title, description = '', category } = req.body;
  const task = await Task.create({ userId: req.user.id, title, description, category });
  return res.status(201).json({ id: String(task._id) });
};

export const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { id } = req.params;
  const update = {};
  if (typeof req.body.isDone === 'boolean') update.isDone = req.body.isDone;
  if (req.body.title) update.title = req.body.title;
  if (req.body.description !== undefined) update.description = req.body.description;
  if (req.body.category) update.category = req.body.category;
  const task = await Task.findOneAndUpdate({ _id: id, userId: req.user.id }, update, { new: true });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  return res.json({ id: String(task._id) });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
  if (!result) return res.status(404).json({ message: 'Task not found' });
  return res.status(204).send();
};


