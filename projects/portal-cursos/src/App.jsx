import './App.css';
import { Outlet, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from './utils/hooks.js';
import { getCurrentTheme, toggleTheme } from './utils/theme.js';

import { MoonIcon, SunIcon, UserCircleIcon } from '@heroicons/react/24/solid';

import { useRef } from 'react';

function App() {
  const { translate, changeLanguage, currentLanguage } = useTranslation();
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Initialize theme on component mount
  useEffect(() => {
    const theme = getCurrentTheme();
    document.body.classList.add(`theme-${theme}`);
    setCurrentTheme(theme);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [userMenuOpen]);

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
          {/* User dropdown menu */}
          <div className="relative user-menu-dropdown" ref={userMenuRef}>
            <button
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-accent/20 transition-colors"
              onClick={() => setUserMenuOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={userMenuOpen}
              title="Menú de usuario"
              type="button"
            >
              <UserCircleIcon className="w-8 h-8 text-primary" />
            </button>
            {userMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-secondary border border-accent rounded-xl shadow-lg z-50 flex flex-col py-2 animate-fade-in"
                style={{ padding: 10 }}
              >
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `px-4 py-2 text-left text-primary font-semibold hover:bg-accent/20 rounded ${isActive ? 'underline' : ''}`
                  }
                  onClick={() => setUserMenuOpen(false)}
                >
                  {translate('admin')}
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-4 py-2 text-left text-primary font-semibold hover:bg-accent/20 rounded ${isActive ? 'underline' : ''}`
                  }
                  onClick={() => setUserMenuOpen(false)}
                >
                  {translate('login')}
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `px-4 py-2 text-left text-primary font-semibold hover:bg-accent/20 rounded ${isActive ? 'underline' : ''}`
                  }
                  onClick={() => setUserMenuOpen(false)}
                >
                  {translate('profile')}
                </NavLink>
                <NavLink
                  to="/mis-cursos"
                  className={({ isActive }) =>
                    `px-4 py-2 text-left text-primary font-semibold hover:bg-accent/20 rounded ${isActive ? 'underline' : ''}`
                  }
                  onClick={() => setUserMenuOpen(false)}
                >
                  {translate('myCourses')}
                </NavLink>
                <NavLink
                  to="/progress"
                  className={({ isActive }) =>
                    `px-4 py-2 text-left text-primary font-semibold hover:bg-accent/20 rounded ${isActive ? 'underline' : ''}`
                  }
                  onClick={() => setUserMenuOpen(false)}
                >
                  {translate('progress')}
                </NavLink>
                <NavLink
                  to="/configuracion"
                  className={({ isActive }) =>
                    `px-4 py-2 text-left text-primary font-semibold hover:bg-accent/20 rounded ${isActive ? 'underline' : ''}`
                  }
                  onClick={() => setUserMenuOpen(false)}
                >
                  {translate('configuration')}
                </NavLink>
              </div>
            )}
          </div>
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
            className="px-3 py-1 text-sm text-primary rounded hover:opacity-80 transition-opacity flex items-center"
            title="Cambiar tema / Change theme"
          >
            {currentTheme === 'light' ? (
              <MoonIcon className="w-6 h-6" />
            ) : (
              <SunIcon className="w-6 h-6" />
            )}
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
