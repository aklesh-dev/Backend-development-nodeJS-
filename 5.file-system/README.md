# Node.js File System (fs) Module Example
examples of how to interact with the file system in Node.js using the built-in `fs` module. The examples include reading from, writing to, and deleting files.
## Prerequisites

Ensure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

## Reading Files

To read a file in Node.js, you can use the `fs.readFile` or `fs.readFileSync` methods. The asynchronous method is generally preferred in production environments to avoid blocking the event loop.

### Asynchronous Example

```javascript
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});
```

## Synchronous Example
Note: Synchronous methods should be used with caution as they block the event loop.
```javascript
const fs = require('fs');

try {
  const data = fs.readFileSync('example.txt', 'utf8');
  console.log('File content:', data);
} catch (err) {
  console.error('Error reading file:', err);
}
```
## Writing Files
To write to a file, you can use the `fs.writeFile` or `fs.writeFileSync` methods.

Asynchronous Example
```javascript
const fs = require('fs');

fs.writeFile('example.txt', 'Hello, Node.js!', (err) => {
  if (err) {
    console.error('Error writing to file:', err);
    return;
  }
  console.log('File written successfully!');
});
```
Synchronous Example
```javascript
const fs = require('fs');

try {
  fs.writeFileSync('example.txt', 'Hello, Node.js!');
  console.log('File written successfully!');
} catch (err) {
  console.error('Error writing to file:', err);
}
```
## Deleting Files
To delete a file, use the `fs.unlink` or `fs.unlinkSync` methods.

Asynchronous Example
```javascript
const fs = require('fs');

fs.unlink('example.txt', (err) => {
  if (err) {
    console.error('Error deleting file:', err);
    return;
  }
  console.log('File deleted successfully!');
});
```
Synchronous Example
```javascript
const fs = require('fs');

try {
  fs.unlinkSync('example.txt');
  console.log('File deleted successfully!');
} catch (err) {
  console.error('Error deleting file:', err);
}
```