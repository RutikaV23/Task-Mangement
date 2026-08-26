function TaskCard({ task, onEdit, onDelete }) {
  const statusColors = {
    TODO: '#6b7280',
    IN_PROGRESS: '#f59e0b',
    COMPLETED: '#10b981',
  };

  const priorityColors = {
    LOW: '#6b7280',
    MEDIUM: '#3b82f6',
    HIGH: '#ef4444',
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-badges">
          <span
            className="badge"
            style={{ backgroundColor: statusColors[task.status] }}
          >
            {task.status.replace('_', ' ')}
          </span>
          <span
            className="badge"
            style={{ backgroundColor: priorityColors[task.priority] }}
          >
            {task.priority}
          </span>
        </div>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      {task.due_date && (
        <p className="task-due">Due: {new Date(task.due_date).toLocaleDateString()}</p>
      )}
      <div className="task-actions">
        <button className="btn btn-edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
