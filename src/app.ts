import express from 'express';
import helmet from 'helmet'; //add/remove http header for security
import morgan from 'morgan'; //for beautiful request logs
import { join } from 'path';
import { bookRouter } from './books/routes';
import dotenv from 'dotenv'; //it will parse .env file and add it to process.env
dotenv.config();
require('./config'); //connecting with mongoDB Database
const app = express();
const port = process.env.PORT || 3001;

app.use(helmet());
app.use('/static', express.static(join(__dirname, './uploads'))); //serving static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

//routing files
app.use('/books', bookRouter);

app.all('*', (req, res) => {
    res.status(404).json({ message: 'Link not found :)' });
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
