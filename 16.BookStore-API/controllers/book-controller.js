import Book from "../models/book.model.js";

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    if (allBooks?.length > 0) {
      res.status(200).json({
        success: true,
        message: 'List of books fetched successfully',
        data: allBooks
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No book are avaiable"
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    });
  }
};

const getSingleBookById = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const bookDetailsById = await Book.findById(getCurrentBookId);
    if (!bookDetailsById) {
      return res.status(404).json({
        success: false,
        message: "Book with current id not found! Please try with different id"
      })

    } else {
      res.status(200).json({
        success: true,
        message: "Book fetched successfully",
        data: bookDetailsById,
      })
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    });
  }
};

const addNewBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);
    if (newBookFormData) {
      res.status(201).json({
        success: true,
        message: 'Book added successfully',
        data: newlyCreatedBook,
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    });
  }
};

const updateBook = async (req, res) => { 
  try {
    const getCurrentBookId = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(getCurrentBookId, req.body, {new: true});
    if(!updatedBook){
      return res.status(404).json({
        success: false,
        message: 'Book not found with this id'
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        data: updatedBook
      })
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    })
  }
};

const deleteBook = async (req, res) => {
  try {
    const getCurrentBookId = req.params.id;
    const bookDeleteById = await Book.findByIdAndDelete(getCurrentBookId);
    if (bookDeleteById) {
      res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
        data: bookDeleteById
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Book not found with this id'
      });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    })
  }
 };

export default { getAllBooks, getSingleBookById, addNewBook, updateBook, deleteBook };