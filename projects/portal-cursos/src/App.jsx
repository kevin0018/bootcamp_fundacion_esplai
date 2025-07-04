/*
/configuracion
Nueva ruta para que el usuario pueda ajustar el tema y el idioma
Página con switches de toggleTheme y setLanguage()
/perfil — Página de perfil personal (simulado)
El usuario ve su nombre, email y preferencias (idioma, tema).
Puede editar su perfil y guardarlo.
Simula carga desde localStorage o un objeto de usuario en contexto.
Opción de “Restablecer valores por defecto”.
/mis-cursos — Cursos favoritos o marcados
Desde cada curso puedes marcar como favorito.
En /mis-cursos se listan todos los cursos favoritos.
Se pueden eliminar cursos favoritos de /mis-cursos.
Mostrar número de favoritos en la navbar con un ícono.
/progreso — Seguimiento del progreso de aprendizaje
Cada curso puede marcarse como “Completado” desde su página de detalle (/cursos/:id).
En /progreso ves:
Lista de cursos completados
Porcentaje total de progreso
Progreso por categoría o nivel (con barras)
/historial — Registro de cursos visitados recientemente
Cada vez que visitas /cursos/:id, se guarda el curso en un array de historial.
En /historial puedes ver los últimos cursos visualizados (limitado a los últimos 5–10).
Permite volver rápidamente a un curso con un botón “Ver de nuevo”.
Añadir botón para borrar historial.

*/
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
      <nav className="w-full flex justify-between items-center bg-secondary text-primary text-2xl font-extrabold shadow-lg" style={{padding: '1.25rem 2rem'}}>
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
