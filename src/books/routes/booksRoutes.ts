import { Router } from 'express';
import { uploadSingle } from '../../utils/fileUploadConfig';
import booksController from '../controllers/booksController';
export let booksRouter: Router = Router();

booksRouter.get('/list', booksController.getBooks);
booksRouter.post('/addBook', uploadSingle('books', 'cover'), booksController.addBook);
booksRouter.get('/:bookId', booksController.getBook);
booksRouter.put('/:bookId', uploadSingle('books', 'cover'), booksController.updateBook);
booksRouter.delete('/:bookId', booksController.deleteBook);
