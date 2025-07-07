const HISTORY_KEY = 'courseHistory';
const HISTORY_LIMIT = 10;

export function getCourseHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addCourseToHistory(course) {
  if (!course || !course.id) return;
  let history = getCourseHistory();
  // Remove if already exists
  history = history.filter((c) => c.id !== course.id);
  // Add to front
  history.unshift(course);
  // Limit size
  if (history.length > HISTORY_LIMIT) history = history.slice(0, HISTORY_LIMIT);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearCourseHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
