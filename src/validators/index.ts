import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
const path = require('path');
class Validation {
    validationObj(method: string): any {
        switch (method) {
            // its better approach to refactor this case further to nested switch case if project contains bigger modules
            case 'addBook': {
                return Joi.object({
                    name: Joi.string().min(3).max(200).required(),
                    price: Joi.number().min(0).required(),
                    writer: Joi.string().min(3).max(200).required()
                });
            }
            case 'updateBook': {
                return Joi.object({
                    bookId: Joi.string().custom(validation.isObjectId),
                    name: Joi.string().min(3).max(200).required(),
                    price: Joi.number().min(0).required(),
                    writer: Joi.string().min(3).max(200).required(),
                    stock: Joi.number().min(0).required()
                });
            }
            case 'getBook': {
                return Joi.object({
                    bookId: Joi.string().custom(validation.isObjectId)
                });
            }
            case 'deleteBook': {
                return Joi.object({
                    bookId: Joi.string().custom(validation.isObjectId)
                });
            }
        }
    }
    validationError(req, res, method: string): boolean {
        const schemaObj = { ...req.body, ...req.params, ...req.query };
        const dataValidate = this.validationObj(method).validate(schemaObj);
        if (dataValidate.error) {
            res.status(400).json({ message: dataValidate.error['details'][0]['message'] });
            return true;
        }
        return false;
    }
    isImage(filename): string {
        const extension = path.extname(filename).toLowerCase();
        switch (extension) {
            case '.jpg':
                return '.jpg';
            case '.jpeg':
                return '.jpeg';
            case '.png':
                return '.png';
            default:
                return;
        }
    }
    isVideo(filename): string {
        const extension = path.extname(filename).toLowerCase();
        switch (extension) {
            case '.mp4':
                return '.mp4';
            case '.mov':
                return '.mov';
            case '.avi':
                return '.avi';
            case '.mkv':
                return '.mkv';
            default:
                return;
        }
    }
    isObjectId(value, helper) {
        if (!isValidObjectId(value)) {
            return helper.error('any.invalid');
        }
        return value;
    }
}
const validation = new Validation();
export default validation;
