const FAVORITES_KEY = 'favoriteCourses';

export function getFavoriteCourses() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addFavoriteCourse(courseId) {
  const favorites = getFavoriteCourses();
  if (!favorites.includes(courseId)) {
    favorites.push(courseId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavoriteCourse(courseId) {
  const favorites = getFavoriteCourses().filter(id => id !== courseId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavoriteCourse(courseId) {
  return getFavoriteCourses().includes(courseId);
}

export function clearFavoriteCourses() {
  localStorage.removeItem(FAVORITES_KEY);
}
