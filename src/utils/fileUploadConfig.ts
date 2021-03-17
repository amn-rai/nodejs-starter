import multer from 'multer';
import { join, extname } from 'path';
import fs from 'fs';

const uploadSingle = (filePathFolder, fileKey) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, join(__dirname, `../uploads/${filePathFolder}/`));
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname));
        }
    });
    return multer({ storage: storage }).single(fileKey);
};
const uploadMultiple = (filePathFolder, fileKey1, filekey2) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, join(__dirname, `../uploads/${filePathFolder}/`));
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname));
        }
    });
    return multer({ storage: storage }).fields([
        { name: fileKey1, maxCount: 1 },
        { name: filekey2, maxCount: 1 }
    ]);
};

const uploadFive = filePathFolder => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, join(__dirname, `../uploads/${filePathFolder}/`));
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname));
        }
    });
    return multer({ storage: storage }).array('file', 5);
};
const deleteFile = filePath => {
    // filePath be like /static/books/pdf-1234567.jpg just pass stored path
    try {
        if (filePath) {
            const fileLoc = join(__dirname, `../uploads/${filePath.split('/static/')[1]}`);
            return fs.unlinkSync(fileLoc);
        }
    } catch (error) {
        return error;
    }
};

export { uploadSingle, uploadMultiple, uploadFive, deleteFile };
