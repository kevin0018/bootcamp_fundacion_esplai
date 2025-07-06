import { useEffect, useState } from 'react';
import { useTranslation } from '../utils/hooks.js';
import {
  getFavoriteCourses,
  removeFavoriteCourse,
  clearFavoriteCourses,
} from '../utils/favorites.js';
import coursesData from '../data/courses.json';

function MyCourses() {
  const { translate } = useTranslation();
  const [favoriteIds, setFavoriteIds] = useState(getFavoriteCourses());

  // Get course objects for the favorite IDs
  const favoriteCourses = coursesData.filter(course => favoriteIds.includes(String(course.id)) || favoriteIds.includes(Number(course.id)));

  useEffect(() => {
    setFavoriteIds(getFavoriteCourses());
  }, []);

  const handleRemove = (id) => {
    removeFavoriteCourse(String(id));
    setFavoriteIds(getFavoriteCourses());
  };

  const handleClear = () => {
    clearFavoriteCourses();
    setFavoriteIds([]);
  };

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-primary rounded-xl shadow-lg p-8 border-4 border-secondary flex flex-col gap-8">
        <h1 className="text-3xl font-extrabold text-secondary text-center mb-4">{translate('myCourses')}</h1>
        {favoriteCourses.length === 0 ? (
          <p className="text-secondary text-center">{translate('noFavorites') || 'No tienes cursos marcados.'}</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {favoriteCourses.map(course => (
              <li key={course.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-secondary/10 rounded p-4 gap-2">
                <div>
                  <span className="font-bold text-secondary">{course.titulo}</span>
                  <span className="ml-2 text-sm text-secondary/80">({course.categoria}, {course.nivel})</span>
                </div>
                <button
                  className="px-3 py-1 bg-accent text-primary rounded font-bold hover:opacity-80 transition-opacity"
                  onClick={() => handleRemove(course.id)}
                >
                  {translate('remove') || 'Eliminar'}
                </button>
              </li>
            ))}
          </ul>
        )}
        {favoriteCourses.length > 0 && (
          <button
            className="mt-4 px-4 py-2 bg-secondary text-primary rounded font-bold hover:opacity-80 transition-opacity"
            onClick={handleClear}
          >
            {translate('clearAll') || 'Eliminar todos'}
          </button>
        )}
      </div>
    </section>
  );
}

export default MyCourses;
