const SAVE_KEY = 'game-save';

export function saveProgress(estado) {
  try {
    // local storage es basicamente una memoria que tiene el navegador donde se pueden guardar datos y no se borrra ni cuando se reinicia el pc
    localStorage.setItem(SAVE_KEY, JSON.stringify(estado));  // solo se pueden guardar strings asi que hay que pasar todos los datos a string
  } catch (e) {
    // si hay errores pues no guarda lmao
    console.error('No se ha podido guardar', e);
  }
}

export function loadProgress() {
  try {
    const data = localStorage.getItem(SAVE_KEY);
    if (data) {
        return JSON.parse(data);
    } else {
        return null;
    }
  } catch (e) {
    console.error('Save invalido', e);
    return null;
  }
}

export function deleteProgress() {
  localStorage.removeItem(SAVE_KEY);
}