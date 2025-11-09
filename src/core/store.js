// src/core/store.js
// Volledig dynamische en reactieve proxy store.

const _state = {};
const _listeners = {};

/**
 * subscribe: Abonneert een component op state-wijzigingen.
 * (Deze functie blijft ongewijzigd)
 */
export function setState(key, callback) {
  if (!_listeners[key]) {
    _listeners[key] = [];
  }
  _listeners[key].push(callback);

  callback(_state[key]);
}

// --- HIER IS DE NIEUWE FUNCTIE ---
/**
 * getState: Haalt de *huidige* waarde op van een key.
 * @param {string} key - De state-key (bv. 'counterValue')
 * @returns {*} De huidige waarde
 */
export function getState(key) {
  return _state[key];
}
// --- EINDE NIEUWE FUNCTIE ---

/**
 * De "Magie": De Proxy Handler
 * (Deze blijft ongewijzigd)
 */
const handler = {
  set(target, key, value) {
    if (!_listeners[key]) {
      _listeners[key] = [];
    }
    target[key] = value;
    _listeners[key].forEach((callback) => callback(value));
    return true;
  },
  get(target, key) {
    return target[key];
  },
};

// Exporteer de proxy EN de nieuwe functie
export const store = new Proxy(_state, handler);
