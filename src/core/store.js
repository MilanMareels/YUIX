const _state = {};
const _listeners = {};

export function setState(key, callback, defaultValue) {
  if (!_listeners[key]) {
    _listeners[key] = [];
  }
  _listeners[key].push(callback);

  let currentValue = _state[key];

  if (currentValue === undefined && defaultValue !== undefined) {
    console.log(`[Store] Key '${key}' is niet ingesteld. Standaardwaarde (${defaultValue}) wordt ingesteld.`);
    store[key] = defaultValue;
    currentValue = defaultValue;
  } else {
    callback(currentValue);
  }
}

export function getState(key) {
  return _state[key];
}

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

export const store = new Proxy(_state, handler);
