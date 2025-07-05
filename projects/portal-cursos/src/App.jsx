import './App.css';
import { Outlet, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from './utils/hooks.js';
import { getCurrentTheme, toggleTheme } from './utils/theme.js';

function App() {
  const { translate, changeLanguage, currentLanguage } = useTranslation();
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());

  // Initialize theme on component mount
  useEffect(() => {
    const theme = getCurrentTheme();
    document.body.classList.add(`theme-${theme}`);
    setCurrentTheme(theme);
  }, []);

  const handleToggleTheme = () => {
    const newTheme = toggleTheme();
    setCurrentTheme(newTheme);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <nav className="w-full flex justify-between items-center bg-secondary text-primary text-2xl font-extrabold shadow-lg" style={{ padding: '1.25rem 2rem' }}>
        <div className="flex justify-center gap-12 flex-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'underline' : undefined
            }
          >
            {translate('home')}
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? 'underline' : undefined
            }
          >
            {translate('courses')}
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? 'underline' : undefined
            }
          >
            {translate('admin')}
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? 'underline' : undefined
            }
          >
            {translate('login')}
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? 'underline' : undefined
            }
          >
            {translate('profile')}
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? 'underline' : undefined
            }
          >
            {translate('favorites')}
          </NavLink>
          <NavLink
            to="/progress"
            className={({ isActive }) =>
              isActive ? 'underline' : undefined
            }
          >
            {translate('progress')}
          </NavLink>
          <NavLink
            to="/configuracion"
            className={({ isActive }) =>
              isActive ? 'underline' : undefined
            }
          >
            {translate('configuration')}
          </NavLink>
        </div>

        {/* Language and Theme Controls */}
        <div className="flex gap-4 items-center">
          <button
            onClick={() => changeLanguage(currentLanguage === 'es' ? 'en' : 'es')}
            className="px-3 py-1 text-sm  text-primary rounded hover:opacity-80 transition-opacity"
            title="Cambiar idioma / Change language"
          >
            {currentLanguage.toUpperCase()}
          </button>
          <button
            onClick={handleToggleTheme}
            className="px-3 py-1 text-sm text-primary rounded hover:opacity-80 transition-opacity"
            title="Cambiar tema / Change theme"
          >
            {currentTheme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
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
