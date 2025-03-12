// Import the 'fs' module for file system operations
const fs = require("fs");

// Import the 'path' module for path manipulations
const path = require("path");

// Define the path to the 'data' folder relative to the current file's directory
const dataFolder = path.join(__dirname, "data");

// Check if the 'data' folder already exists
if (!fs.existsSync(dataFolder)) {
  // If the folder does not exist, create it synchronously
  fs.mkdirSync(dataFolder);
  // Log a message indicating that the folder has been created
  console.log("Data folder created.");
} else {
  // If the folder exists, log a message indicating that
  console.log("Folder already exists!");
}

// Define the path to the 'example.txt' file within the 'data' folder
const filePath = path.join(dataFolder, "example.txt");

// Synchronously write a string to the 'example.txt' file
fs.writeFileSync(filePath, "Hello, creating a file in Node.js.");
// Log a message indicating that the file has been created successfully
console.log("File created successfully.");

// Try to read the content of the 'example.txt' file synchronously
try {
  // Read the content of the file using UTF-8 encoding
  const readContent = fs.readFileSync(filePath, "utf8");
  // Log the content of the file to the console
  console.log("File content:", readContent);
} catch (error) {
  // If an error occurs during the file reading process, log the error to the console
  console.error("Error reading file:", error);
}
// Append a new line to the existing file synchronously
fs.appendFileSync(filePath, "\nThis is a new line add in the file.");
// Log a message to the console indicating that a new line has been added to the file
console.log("New line added in the file");

// Asynchronous way of writing file
const asyncFilePath = path.join(dataFolder, "async-example.txt");
fs.writeFile(asyncFilePath, "Hello, Node.js!", (err) => {
  if (err) {
    console.error("Error writing to file:", err);
    return;
  }
  console.log("File written successfully!");

  // Asynchronously read the content of the file
  fs.readFile(asyncFilePath, "utf-8", (err, data) => {
    if (err) throw err; // Log the error and stop execution (using throw to terminate the function)
    console.log("Async File content:", data)

    // Asynchronously append data to the file
    fs.appendFile(asyncFilePath, "\nThis is a new line added.", (err) => {
      if (err) {
        console.error("Error appending to file:", err);
        return;
      }

      // Asynchronously read the updated content of the file
      fs.readFile(asyncFilePath, "utf8", (err, updateData) => {
        if (err) throw err;
        console.log("Updated data:", updateData)
      })

    })
  })

})

