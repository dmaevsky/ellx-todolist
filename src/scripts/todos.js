import { tx, writable } from 'tinyx';
import logger from 'tinyx/middleware/logger';

export const localState = value => (w => [w, w.set])(writable(value));

export const todos = logger(tx(new Map([
  [0, { text: 'Learn Ellx!!!', done: true }],
  [1, { text: 'Deploy my app...', done: false }]
])));

let counter = todos.get().size;

const ADD_TODO = text => ({ set }) => set(counter++, { text, done: false });
const UPDATE_TODO = updates => ({ update }) => update(item => ({...item, ...updates }));
const REMOVE_TODO = id => ({ remove }) => remove(id);

export const addTodo = text => todos.commit(ADD_TODO, text);
export const editTodo = (id, updates) => todos.commit(UPDATE_TODO, updates, id);
export const removeTodo = id => todos.commit(REMOVE_TODO, id);

export function startEditing(input, cb) {
  const keyBindings = {
    'Enter': () => cb(input.value),
    'Escape': () => cb(null)
  };

  const keydown = e => {
    if (e.key in keyBindings) {
      e.preventDefault();
      keyBindings[e.key]();
    }
  }

  input.addEventListener('keydown', keydown);
  input.addEventListener('blur', keyBindings.Escape);

  input.focus();

  return () => {
    input.removeEventListener('keydown', keydown);
    input.removeEventListener('blur', keyBindings.Escape);
  }
}
