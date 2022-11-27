import { writable } from 'tinyx';

export const count = writable(0);
export const increaseCount = () => count.update(c => c + 1);
export const decreaseCount = () => count.update(c => c - 1);
