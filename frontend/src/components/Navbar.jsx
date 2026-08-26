function Navbar({ currentPage, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate('dashboard')}>
        Task Manager
      </div>
      <div className="navbar-links">
        <button
          className={currentPage === 'dashboard' ? 'active' : ''}
          onClick={() => onNavigate('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={currentPage === 'tasks' ? 'active' : ''}
          onClick={() => onNavigate('tasks')}
        >
          Tasks
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
