const fs = require("fs")

function person(name, callbackFn) {
  console.log(`Hello there, ${name}`)
  callbackFn()
};

function address() {
  console.log("Heavenly");
};

person("Aklesh Yadav", address)

fs.readFile("readme.md", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  } else {
    console.log(data);
  }
});