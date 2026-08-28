import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Loading from '../components/Loading';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(formData) {
    try {
      await createTask(formData);
      setShowForm(false);
      setMessage('Task created successfully');
      setTimeout(() => setMessage(''), 3000);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdate(formData) {
    try {
      await updateTask(editingTask.id, formData);
      setEditingTask(null);
      setShowForm(false);
      setMessage('Task updated successfully');
      setTimeout(() => setMessage(''), 3000);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      setMessage('Task deleted successfully');
      setTimeout(() => setMessage(''), 3000);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEdit(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingTask(null);
    setShowForm(false);
  }

  const filteredTasks = tasks.filter((task) => {
    const term = searchTerm.toLowerCase();
    return (
      task.title.toLowerCase().includes(term) ||
      (task.description && task.description.toLowerCase().includes(term))
    );
  });

  if (loading) return <Loading />;

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h1>Tasks</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
        >
          + New Task
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={handleCancel}
        />
      )}

      {tasks.length > 0 && (
        <div className="search-bar">
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Click "New Task" to create one.</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found.</p>
        </div>
      ) : (
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Tasks;
