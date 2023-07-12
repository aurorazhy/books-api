import {
   addBooks,
   showBooks,
   showBookOne,
   editBooks,
   deleteBooks,
} from './handler.js';

const routes = [
   {
      method: 'POST',
      path: '/books',
      handler: addBooks,
   },
   {
      method: 'GET',
      path: '/books',
      handler: showBooks,
   },
   {
      method: 'GET',
      path: '/books/{bookId}',
      handler: showBookOne,
   },
   {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: editBooks,
   },
   {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: deleteBooks,
   },
];

export default routes;
