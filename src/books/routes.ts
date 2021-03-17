import { Router } from 'express';
import { booksRouter } from './routes/booksRoutes';

export let bookRouter: Router = Router();
bookRouter.use('/', booksRouter);
