import { nanoid } from 'nanoid';
import books from './books.js';

const addBooks = (request, h) => {
   const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
   } = request.payload;

   if (!name) {
      const response = h.response({
         status: 'fail',
         message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
   }

   if (readPage > pageCount) {
      const response = h.response({
         status: 'fail',
         message:
            'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
   }

   const id = nanoid(16);
   const insertedAt = new Date().toISOString();
   const updatedAt = insertedAt;
   let finished = false;
   if (pageCount === readPage) {
      finished = true;
   }

   const newBooks = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
   };

   books.push(newBooks);
   const success = books.filter((book) =>
      book.id === id).length > 0;

   if (success) {
      const response = h.response({
         status: 'success',
         message: 'Buku berhasil ditambahkan',
         data: {
            bookId: id,
         },
      });
      response.code(201);
      return response;
   }
   const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
   });
   response.code(500);
   return response;
};

const showBooks = (request, h) => {
   const { name, reading, finished } = request.query;

   let booksFilter = books;

   if (name) {
      booksFilter = booksFilter.filter((book) =>
         book.name.toLowerCase().includes(name.toLowerCase()));
   }

   if (reading) {
      booksFilter = booksFilter.filter(
         (book) =>
            book.reading === !!Number(reading),
      );
   }

   if (finished) {
      booksFilter = booksFilter.filter(
         (book) =>
            book.finished === !!Number(finished),
      );
   }

   const response = h.response({
      status: 'success',
      data: {
         books: booksFilter.map((book) =>
            ({
               id: book.id,
               name: book.name,
               publisher: book.publisher,
            })),
      },
   });
   response.code(200);
   return response;
};

const showBookOne = (request, h) => {
   const { bookId } = request.params;

   const book = books.filter((b) =>
      b.id === bookId)[0];

   if (book) {
      const response = h.response({
         status: 'success',
         data: {
            book,
         },
      });
      response.code(200);
      return response;
   }
   const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
   });
   response.code(404);
   return response;
};

const editBooks = (request, h) => {
   const { bookId } = request.params;
   const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
   } = request.payload;
   const updatedAt = new Date().toISOString();
   if (!name) {
      const response = h.response({
         status: 'fail',
         message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
   }

   if (readPage > pageCount) {
      const response = h.response({
         status: 'fail',
         message:
            'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
   }
   const bookIndex = books.findIndex((book) =>
      book.id === bookId);

   if (bookIndex !== -1) {
      books[bookIndex] = {
         ...books[bookIndex],
         name,
         year,
         author,
         summary,
         publisher,
         pageCount,
         readPage,
         reading,
         updatedAt,
      };
      const response = h.response({
         status: 'success',
         message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
   }
   const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
   });
   response.code(404);
   return response;
};

const deleteBooks = (request, h) => {
   const { bookId } = request.params;

   const bookIndex = books.findIndex((book) =>
      book.id === bookId);
   if (bookIndex !== -1) {
      books.splice(bookIndex, 1);
      const response = h.response({
         status: 'success',
         message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
   }

   const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
   });
   response.code(404);
   return response;
};

export {
   addBooks, showBooks, showBookOne, editBooks, deleteBooks,
};
