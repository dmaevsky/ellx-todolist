import welcome from './welcome.html';
import about from './about.html';
import todos from './todos.html';
import notFound from './404.html';

import makeRouter from '@ellx/router';

const pages = { welcome, about, todos };

export const router = makeRouter();

export function currentPage(path) {
  const pageKey = path.slice(1) || 'welcome';
  return {
    title: pageKey in pages ? pageKey[0].toUpperCase() + pageKey.slice(1) : 'Not found',
    body: pages[pageKey] || notFound
  }
}
