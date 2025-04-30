function setItem(key, value) {
  if (!key || typeof key !== 'string') {
    console.error('Type of key must be a string');
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting item in localStorage', error);
  }
}

function getItem(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return localStorage.getItem(key);
  }
}

function removeItem(key) {
  localStorage.removeItem(key);
}

function clear() {
  localStorage.clear();
}

export { setItem, clear, getItem, removeItem };
