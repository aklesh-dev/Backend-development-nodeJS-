## Introduction to Modules

A module in Node.js is a self-contained piece of code that can be included in other files. Modules are files that perform specific tasks and can export functions or objects to be used in other parts of your application. Node.js treats each file as a separate module, which means you can organize your code effectively.

## CommonJS Module System

Node.js initially used the CommonJS module system, which is based on the `require` method and `module.exports`. Here's a quick overview:

- **`require(module)`**: Loads a module and returns the exported object.
- **`module.exports`**: Defines what a module exports and makes it available for other modules to import.

Example:

```javascript
// math.js
module.exports = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  }
};

// main.js
const math = require('./math');
console.log(math.add(5, 3)); // Output: 8
console.log(math.subtract(5, 3)); // Output: 2
```

## ES Module System
Node.js supports ES modules, which are the standard module system used in modern JavaScript. ES modules use the import and export keywords.

Example:
```javaScript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// main.js
import { add, subtract } from './math.js';
console.log(add(5, 3)); // Output: 8
console.log(subtract(5, 3)); // Output: 2
```

## Using TypeScript with Node.js Modules
TypeScript supports both CommonJS and ES module systems. To use ES modules in a TypeScript project, you need to enable them in your tsconfig.json file.

Here's a basic tsconfig.json configuration for using ES modules:
```typeScript
{
  "compilerOptions": {
    "module": "ESNext", // Use ES module system
    "target": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src"]
}
```

## Module Wrapper
Node.js wraps each module in a function before executing it. This function is known as the module wrapper and provides a private scope for the module. The wrapper function looks something like this:
```javaScript
(function(exports, require, module, __filename, __dirname) {
    // Module code goes here
});
```
Breakdown of Module Wrapper Parameters
- `exports`: An object that represents what is exported from the module.
- `require`: A function to include modules in the current module.
- `module`: A reference to the current module.
- `__filename`: The filename of the current module.
- `__dirname`: The directory name of the current module.

This wrapper ensures that the variables and functions declared in a module are local to that module, preventing them from polluting the global namespace.