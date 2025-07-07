import coursesData from '../data/courses.json';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  getFavoriteCourses,
  addFavoriteCourse,
  removeFavoriteCourse
} from '../utils/favorites.js';
import { useTranslation } from '../utils/hooks.js';
import { useProgress } from '../context/progressContext.js';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { translate } = useTranslation();
  const course = coursesData.find(c => String(c.id) === String(id));

  // State for favorite
  const [isFavorite, setIsFavorite] = useState(getFavoriteCourses().includes(Number(id)) || getFavoriteCourses().includes(String(id)));

  // Progress context
  const { completedCourses, markCourseCompleted, unmarkCourseCompleted } = useProgress();
  const isCompleted = completedCourses.includes(Number(id)) || completedCourses.includes(String(id));

  useEffect(() => {
    setIsFavorite(getFavoriteCourses().includes(Number(id)) || getFavoriteCourses().includes(String(id)));
  }, [id]);

  if (!course) {
    return (
      <div className="flex items-center justify-center bg-primary">
        <div className="bg-secondary rounded-lg shadow-lg p-8 flex flex-col items-center gap-4 error-container">
          <h1 className="text-2xl font-bold text-accent">¡Curso no encontrado!</h1>
          <button className="mt-4 px-4 py-2 bg-accent text-secondary font-semibold rounded hover:bg-accent/80 transition-all" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
        <style jsx="true">
          {`
            .error-container {
              padding: 10px;
            }
            button {
              padding: 0 10px;
            }
          `}
        </style>
      </div>
    );
  }

  // Toggle favorite status
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteCourse(course.id);
    } else {
      addFavoriteCourse(course.id);
    }
    setIsFavorite(getFavoriteCourses().includes(Number(id)) || getFavoriteCourses().includes(String(id)));
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-2 sm:px-4">
      <div className="w-full max-w-2xl bg-primary rounded-xl shadow-lg p-8 flex flex-col items-center border-4 border-secondary">
        <button className="mb-6 px-6 py-2 bg-accent text-secondary font-bold rounded-xl shadow hover:bg-accent/80 transition-all self-start" onClick={() => navigate(-1)}>
          Volver
        </button>
        <div className="w-full bg-primary rounded-xl shadow p-8 flex flex-col items-start">
          <div className="flex items-center w-full justify-between mb-2">
            <h2 className="text-3xl font-extrabold text-secondary drop-shadow">{course.titulo}</h2>
            <button
              className="favorite-btn text-2xl ml-4 focus:outline-none"
              aria-label={isFavorite ? translate('remove') || 'Eliminar de favoritos' : translate('addFavorite') || 'Añadir a favoritos'}
              onClick={handleToggleFavorite}
            >
              {isFavorite
                ? <span className="text-red-500">♥</span>
                : <span className="text-secondary">♡</span>
              }
            </button>
          </div>
          <p className="text-secondary mb-2 font-semibold">Categoría: <span className="text-accent font-semibold">{course.categoria}</span></p>
          <p className="text-secondary mb-2 font-semibold">Nivel: <span className="text-accent font-semibold">{course.nivel}</span></p>
          <p className="text-secondary mb-2 font-semibold">Duración: <span className="text-accent font-semibold">{course.duracion}h</span></p>
          <p className="text-secondary mb-2 font-semibold">Valor: <span className="text-accent font-semibold">{course.valor}</span></p>
          <p className="text-secondary mt-6 font-semibold">{course.descripcion}</p>
          {/* Mark as completed button */}
          <div className="w-full flex justify-center">
            <button
              className={`mt-6 px-4 py-2 rounded font-bold shadow transition-all border-2
                bg-accent text-secondary border-secondary
                hover:bg-accent/80
                ${isCompleted ? 'opacity-70 cursor-default' : 'cursor-pointer'}`}
              onClick={() => isCompleted ? unmarkCourseCompleted(Number(id)) : markCourseCompleted(Number(id))}
              disabled={isCompleted}
            >
              {isCompleted ? '¡Completado!' : 'Marcar como completado'}
            </button>
          </div>
        </div>
      </div>
      <style jsx="true">
        {`
          button {
            padding: 0 10px;
        `}
      </style>
    </div>
  );
}
