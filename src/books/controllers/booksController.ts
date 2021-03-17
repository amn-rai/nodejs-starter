import booksModel from '../../models/booksModel';
import messages from '../../utils/messages';
import V from '../../validators';
import Utils from '../../utils';

class BooksController {
    async addBook(req, res) {
        try {
            if (V.validationError(req, res, 'addBook')) return;
            const { name, price, writer, stock } = req.body;
            let book = new booksModel({
                name,
                price,
                writer,
                stock,
                cover: req.file ? `/static/books/${req.file.filename}` : ''
            });
            book.save((err: any) => {
                if (err) return O.res400(res, err);
                res.status(200).json({ message: messages.bookAdded });
            });
        } catch (error) {
            O.res400(res);
        }
    }
    async updateBook(req, res) {
        try {
            if (V.validationError(req, res, 'updateBook')) return;
            const { name, price, writer, stock } = req.body;
            let book = {
                name,
                price,
                writer,
                stock
            };
            if (req.files) book['cover'] = `/static/books/${req.file.filename}`;
            await booksModel.findByIdAndUpdate(req.params.bookId, book);
            res.status(200).json({ message: messages.bookUpdated });
        } catch (error) {
            O.res400(res);
        }
    }
    async deleteBook(req, res) {
        try {
            if (V.validationError(req, res, 'deleteBook')) return;
            await booksModel.findByIdAndDelete(req.params.bookId);
            res.status(200).json({ message: messages.bookDeleted });
        } catch (error) {
            O.res400(res);
        }
    }
    async getBook(req, res) {
        try {
            if (V.validationError(req, res, 'getBook')) return;
            let data = await booksModel.findById(req.params.bookId);
            res.status(200).json({ data });
        } catch (error) {
            O.res400(res);
        }
    }
    getBooks(req, res) {
        Utils.paginationFun(req, res, booksModel, '', []);
    }

    //for common error
    res400(res, error = 'Something went wrong.') {
        res.status(400).json({ message:error });
    }
}
let O = new BooksController();
export default O;
