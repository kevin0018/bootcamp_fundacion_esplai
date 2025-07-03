export function getCurrentTheme() {
  return localStorage.getItem('theme') || 'dark';
}

export function setTheme(theme) {
  localStorage.setItem('theme', theme);
  document.body.className = document.body.className.replace(/theme-\w+/g, '');
  document.body.classList.add(`theme-${theme}`);
}

export function toggleTheme() {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
}
