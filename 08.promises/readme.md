## Promise
A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises provide a way to handle asynchronous code more cleanly and manageably compared to traditional callback functions.

#### Here's a breakdown of how Promises work:

`Pending:` The initial state of a Promise. It is neither fulfilled nor rejected.

`Fulfilled:` The state of a Promise representing a successful operation.

`Rejected:` The state of a Promise representing a failed operation.

#### Promises have methods like `.then()` and `.catch()` to handle the result of the operation:

`.then():` This method is called when the Promise is fulfilled. You can pass a callback function to it to handle the resolved value.

`.catch():` This method is called when the Promise is rejected. You can pass a callback function to it to handle the error.