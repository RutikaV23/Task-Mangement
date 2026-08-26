const pool = require('../config/db');

const VALID_STATUSES = ['TODO', 'IN_PROGRESS', 'COMPLETED'];
const VALID_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];

async function createTask({ title, description, status, priority, due_date, user_id }) {
  const [result] = await pool.execute(
    `INSERT INTO tasks (title, description, status, priority, due_date, user_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      title,
      description || null,
      status || 'TODO',
      priority || 'MEDIUM',
      due_date || null,
      user_id,
    ]
  );
  const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
  return rows[0];
}

async function getAllTasks() {
  const [rows] = await pool.execute('SELECT * FROM tasks ORDER BY created_at DESC');
  return rows;
}

async function getTaskById(id) {
  const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows[0] || null;
}

async function updateTask(id, { title, description, status, priority, due_date }) {
  const fields = [];
  const values = [];

  if (title !== undefined) { fields.push('title = ?'); values.push(title); }
  if (description !== undefined) { fields.push('description = ?'); values.push(description); }
  if (status !== undefined) { fields.push('status = ?'); values.push(status); }
  if (priority !== undefined) { fields.push('priority = ?'); values.push(priority); }
  if (due_date !== undefined) { fields.push('due_date = ?'); values.push(due_date); }

  if (fields.length === 0) return null;

  values.push(id);
  await pool.execute(`UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`, values);
  const [rows] = await pool.execute('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows[0] || null;
}

async function deleteTask(id) {
  const [result] = await pool.execute('DELETE FROM tasks WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  VALID_STATUSES,
  VALID_PRIORITIES,
};
