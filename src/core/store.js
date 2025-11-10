const _state = {};
const _listeners = {};

export function setState(key, callback) {
  if (!_listeners[key]) {
    _listeners[key] = [];
  }
  _listeners[key].push(callback);

  callback(_state[key]);
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
