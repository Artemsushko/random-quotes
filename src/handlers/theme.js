import { setItem, getItem } from '../utils/localStorage.js';

function handleThemeToggle(themeToggle) {
  themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('body-dark');
    document.body.classList.toggle('body-light');
    const currentTheme = document.body.classList.contains('body-dark')
      ? 'body-dark'
      : 'body-light';
    setItem('currentTheme', currentTheme);
  });
}

function applySavedTheme(themeToggle) {
  const savedTheme = getItem('currentTheme') || 'body-dark';
  themeToggle.checked = savedTheme === 'body-light';
  document.body.classList.remove('body-dark', 'body-light');
  document.body.classList.add(savedTheme);
}

export { handleThemeToggle, applySavedTheme };
