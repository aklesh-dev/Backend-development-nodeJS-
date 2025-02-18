## Node.js path Module
The path module in Node.js provides utilities for working with file and directory paths. It is a built-in module, so you do not need to install it separately. The functions in this module perform only string manipulation and do not access the filesystem

## Usage
To use the path module, you first need to require it in your Node.js application:
```javascript
const path = require('path');
```
### Common Methods
`path.join([...paths])`

Joins all given path segments together using the platform-specific separator as the delimiter, then normalizes the resulting path.

Example:
```javascript
const filePath = path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
console.log(filePath); // Outputs: '/foo/bar/baz/asdf'

```
`path.resolve([...paths])`

Resolves a sequence of paths or path segments into an absolute path.
Example:
```javascript
const absolutePath = path.resolve('/foo/bar', './baz');
console.log(absolutePath); // Outputs: '/foo/bar/baz'
```
`path.extname(path)`

Returns the extension of the path, from the last occurrence of the . (period) character to the end of the string in the last portion of the path.

Example:
```javascript
const ext = path.extname('index.html');
console.log(ext); // Outputs: '.html'
```
`path.basename(path[, ext])`

Returns the last portion of a path, similar to the Unix basename command.

Example:
```javascript
const fileName = path.basename('/foo/bar/baz.txt');
console.log(fileName); // Outputs: 'baz.txt'
```
`path.dirname(path)`

Returns the directory name of a path, similar to the Unix dirname command.

Example:
```javascript
const dirName = path.dirname('/foo/bar/baz.txt');
console.log(dirName); // Outputs: '/foo/bar'
```