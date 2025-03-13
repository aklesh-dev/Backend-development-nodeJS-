import Author from "../models/Author.model.js";
import Book from "../models/Book.model.js";

export const createAuthor = async (req, res) => {
  try {
    const body = req.body;
    const newAuthor = await Author.create(body);

    if(newAuthor){
      return res.status(201).json({
        success: true,
        message: "Author created!",
        data: newAuthor,
      });
    }

  } catch (error) {
    console.error("Error creating author:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      
    })
  }
};

export const createBook = async (req, res) => { 
  try {
    const body = req.body;
    const newBook = new Book(body);
    await newBook.save();
    if(newBook){
      return res.status(201).json({
        success: true,
        message: "Book created!",
        data: newBook,
      })
    }
    
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
 }

export const getBookWithAuthor = async (req, res) => { 
  try {
    //* Attempt to find a book by its ID and populate the 'author' field with the corresponding author data
    const book = await Book.findById(req.params.id).populate("author")
    if(!book){
      return res.status(404).json({
        success: false,
        message: "Book not found!"
      });
    }
    res.status(200).json({
      success: true,
      data:book,
    })
    
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
 }