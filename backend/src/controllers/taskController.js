const taskModel = require('../models/taskModel');

const createTask = async (req, res, next) => {
  try {
    const { title, user_id, status, priority } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    if (!user_id) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }
    if (status && !taskModel.VALID_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${taskModel.VALID_STATUSES.join(', ')}` });
    }
    if (priority && !taskModel.VALID_PRIORITIES.includes(priority)) {
      return res.status(400).json({ success: false, message: `Priority must be one of: ${taskModel.VALID_PRIORITIES.join(', ')}` });
    }

    const task = await taskModel.createTask(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskModel.getAllTasks();
    res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid task ID' });
    }

    const task = await taskModel.getTaskById(id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid task ID' });
    }

    const { status, priority } = req.body;
    if (status && !taskModel.VALID_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${taskModel.VALID_STATUSES.join(', ')}` });
    }
    if (priority && !taskModel.VALID_PRIORITIES.includes(priority)) {
      return res.status(400).json({ success: false, message: `Priority must be one of: ${taskModel.VALID_PRIORITIES.join(', ')}` });
    }

    const existing = await taskModel.getTaskById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const task = await taskModel.updateTask(id, req.body);
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid task ID' });
    }

    const existing = await taskModel.getTaskById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    await taskModel.deleteTask(id);
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
