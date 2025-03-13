import mongoose from "mongoose";  // Import the mongoose library

// Define a new schema for the Book model
const BookSchema = new mongoose.Schema({
  name: String,  // Define a 'name' field as a String
  author: {      // Define an 'author' field
    type: mongoose.Schema.Types.ObjectId,  //* The type of the field is ObjectId, which is used to reference another document
    // !The ref field should match the model name exactly, including case sensitivity.
    ref: "Author"  //* This references the Author model, allowing for population of the author data when querying books
  }
});

// Export the Book model, using the defined schema
export default mongoose.model("Book", BookSchema);
