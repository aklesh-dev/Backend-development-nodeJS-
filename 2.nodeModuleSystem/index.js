// module.exports
// require

const firstModule = require("./first-module")
console.log("Addition:", firstModule.add(10,20));

// Divide
try {
  console.log("Dividing with 0")
  let result = firstModule.divide(10,0)
  console.log("Divide:",result);
} catch (error) {
  console.error("Caught an error:", error.message);
}

// --module wrapper
(
  function (exports, require, module, __filename, __dirname) {
    // your module code goes here
  }
)