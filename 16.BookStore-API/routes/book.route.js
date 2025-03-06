import express from 'express';
import bookController from '../controllers/book-controller.js';

const { getAllBooks, getSingleBookById, addNewBook, updateBook, deleteBook } = bookController;

const router = express.Router();


// all routes that are related to book only
// get all books
router.get('/get', getAllBooks);
// get indivisual book
router.get('/get/:id', getSingleBookById);
// add new book
router.post('/add', addNewBook);
// update a book
router.patch('/update/:id', updateBook);
// delete a book
router.delete('/delete/:id', deleteBook);


export default router;