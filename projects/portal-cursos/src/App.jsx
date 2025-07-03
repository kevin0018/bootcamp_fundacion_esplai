import './App.css';
import { Outlet, NavLink } from 'react-router-dom';
function App() {
  return (
    <div className="min-h-screen bg-theme-primary flex flex-col">
      <nav className="w-full flex justify-center gap-12 bg-secondary text-primary text-2xl font-extrabold shadow-lg" style={{padding: '1.25rem 2rem'}}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'underline' : undefined
          }
        >
          Inicio
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive ? 'underline' : undefined
          }
        >
          Cursos
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? 'underline' : undefined
          }
        >
          Admin
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? 'underline' : undefined
          }
        >
          Login
        </NavLink>
      </nav>
      <main className="flex-1 flex flex-col flex-nowrap justify-center">
        <Outlet />
      </main>
      <style jsx="true">
        {`
          main {
            padding-top: 10px;
          }
        `}
      </style>
    </div>
  );
}
export default App
