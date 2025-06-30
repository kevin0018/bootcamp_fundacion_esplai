import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const exercises = [
  { path: '/r01', label: 'R01' },
  { path: '/r02', label: 'R02' },
  { path: '/r03', label: 'R03' },
  { path: '/r04', label: 'R04' },
  { path: '/r06', label: 'R06' },
  { path: '/r09', label: 'R09' },
  { path: '/r10', label: 'R10' },
  { path: '/r11', label: 'R11' },
  { path: '/r12', label: 'R12' },
];

/**
 * Responsive sidebar navigation for exercises.
 */
function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        className="btn btn-dark d-lg-none position-fixed"
        style={{ 
          top: '20px', 
          left: '20px', 
          zIndex: 1051,
          border: '1px solid #495057',
          padding: '8px 12px'
        }}
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" style={{ 
          display: 'inline-block',
          width: '1.5em',
          height: '1.5em',
          verticalAlign: 'middle',
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: '100%'
        }}></span>
      </button>

      {isOpen && (
        <div
          className="position-fixed w-100 h-100 d-lg-none"
          style={{ 
            top: 0, 
            left: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            zIndex: 1040 
          }}
          onClick={closeSidebar}
        ></div>
      )}

      <aside 
        className={`text-light p-3 h-100 d-flex flex-column position-fixed position-lg-static ${
          isOpen ? 'd-block' : 'd-none d-lg-flex'
        }`}
        style={{ 
          minWidth: 250,
          width: 250,
          zIndex: 1050,
          top: 0,
          left: 0,
          backgroundColor: '#242424',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <button
          className="btn btn-sm btn-outline-light align-self-end d-lg-none mb-2"
          onClick={closeSidebar}
          aria-label="Close navigation"
          style={{ width: 'auto' }}
        >
          ✕
        </button>

        <h2 className="fs-5 fw-bold mb-4 text-center">Ejercicios</h2>
        <nav className="nav flex-column gap-2">
          <Link 
            to="/" 
            className={`nav-link text-light${location.pathname === '/' ? ' active fw-bold' : ''}`}
            onClick={closeSidebar}
          >
            Inicio
          </Link>
          {exercises.map(ex => (
            <Link
              key={ex.path}
              to={ex.path}
              className={`nav-link text-light${location.pathname === ex.path ? ' active fw-bold' : ''}`}
              onClick={closeSidebar}
            >
              {ex.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
