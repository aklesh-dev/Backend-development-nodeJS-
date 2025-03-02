const express = require("express");
const app = express();

// Middleware
app.use(express.json());


let Books = [
  {id:1, title:'Book1'},
  {id:2, title:'Book2'},
];

// Routes
// get intro
app.get('/',(req, res)=>{
  res.json({
    message:"Welcome to our Bookstore api."
  });
});

// get all books
app.get('/get-books',(req, res)=>{
  res.json(Books);
});

// get single book
app.get('/get/:id',(req,res)=>{
  const bookId = parseInt(req.params.id)
  const book = Books.find((book) => book.id === bookId);
  if (book) {
    res.status(200).json({book ,message:'success'});
  } else {
    res.status(404).json({
      message:"Book not found, please try with different Book ID",
    });
  }
});

// add a new book
app.post('/add', (req,res)=>{
  const newBook = {
    id: Math.floor(Math.random()*100),
    title: `Book ${Math.floor(Math.random()*100)}`,
  };
  Books.push(newBook);
  res.status(200).json({
    data:newBook,
    message:'New Book added successfully',
  });
});

// update a book
app.put('/update/:id', (req,res)=>{
  const currentBookId = Books.find(book => book.id === parseInt(req.params.id));
  if (currentBookId) {
    currentBookId.title = req.body.title || currentBookId.title;
    res.status(200).json({
      data:currentBookId,
      message:`Book with ${req.params.id} is updated successfully`,
    });
  } else {
    res.status(404).json({message:"Book not found!"});
  }
});

// delete a book
app.delete('/delete/:id', (req,res)=>{
  const bookId = parseInt(req.params.id);
  const indexOfCurrentBook = Books.findIndex(book => book.id === bookId);
  if (indexOfCurrentBook !== -1) {
    const deleteBook = Books.splice(indexOfCurrentBook, 1);
    res.status(200).json({
      message:`Book with id: ${req.params.id} is deleted successfully.`,
      data: deleteBook[0],
    });
  } else{
    res.status(404).json({message:'Book not found'});
  }
});

app.listen(3000, ()=>{
  console.log("Server is running!!!");
});