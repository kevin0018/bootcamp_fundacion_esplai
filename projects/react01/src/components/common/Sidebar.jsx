import { Link, useLocation } from 'react-router-dom';

const exercises = [
  { path: '/r01', label: 'R01' },
  { path: '/r02', label: 'R02' },
  { path: '/r03', label: 'R03' },
  { path: '/r04', label: 'R04' },
  { path: '/r06', label: 'R06' },
  { path: '/r09', label: 'R09' },
  { path: '/r10', label: 'R10' },
  { path: '/r11', label: 'R11' },
];

/**
 * Sidebar navigation for exercises.
 */
function Sidebar() {
  const location = useLocation();
  return (
    <aside className="bg-dark text-light p-3 h-100 d-flex flex-column" style={{ minWidth: 180 }}>
      <h2 className="fs-5 fw-bold mb-4 text-center">Ejercicios</h2>
      <nav className="nav flex-column gap-2">
        <Link to="/" className={`nav-link text-light${location.pathname === '/' ? ' active fw-bold' : ''}`}>Inicio</Link>
        {exercises.map(ex => (
          <Link
            key={ex.path}
            to={ex.path}
            className={`nav-link text-light${location.pathname === ex.path ? ' active fw-bold' : ''}`}
          >
            {ex.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
