import { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';
import Loading from '../components/Loading';

function Dashboard({ onNavigate }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;

  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'TODO').length,
    inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
    completed: tasks.filter((t) => t.status === 'COMPLETED').length,
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Tasks</p>
        </div>
        <div className="stat-card stat-todo">
          <h3>{stats.todo}</h3>
          <p>Todo</p>
        </div>
        <div className="stat-card stat-progress">
          <h3>{stats.inProgress}</h3>
          <p>In Progress</p>
        </div>
        <div className="stat-card stat-completed">
          <h3>{stats.completed}</h3>
          <p>Completed</p>
        </div>
      </div>
      <div className="recent-tasks">
        <h2>Recent Tasks</h2>
        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet. Create one to get started!</p>
        ) : (
          <div className="task-list">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="task-list-item">
                <span className="task-title">{task.title}</span>
                <span
                  className="badge"
                  style={{
                    backgroundColor:
                      task.status === 'COMPLETED'
                        ? '#10b981'
                        : task.status === 'IN_PROGRESS'
                        ? '#f59e0b'
                        : '#6b7280',
                  }}
                >
                  {task.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        )}
        <button className="btn btn-primary" onClick={() => onNavigate('tasks')}>
          View All Tasks
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
