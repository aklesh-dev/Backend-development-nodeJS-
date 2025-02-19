const fs = require("fs");

fs.readFile("readme.md", "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading file:`, err);
    return;
  }

  const modifyFileData = data.toUpperCase();

  fs.writeFile("output.txt", modifyFileData, (err) => {
    if (err) {
      console.log("Error writing file:", err);
      return;
    }

    console.log("data written to new file.");

    fs.readFile("output.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
      console.log(data);
    })
  });
  
})