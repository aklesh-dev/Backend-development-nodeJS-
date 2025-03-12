## Async & await
In Node.js, `async` and `await` are keywords used to work with asynchronous operations, making your code cleaner and easier to understand compared to traditional callback-based or promise-based asynchronous code.

`async`

The `async` keyword is used to declare a function as asynchronous. When you declare a function with `async`, it automatically returns a promise. This allows you to use `await` within the function to pause the execution of the function until a promise is resolved or rejected.

`await`

The `await` keyword can only be used inside an `async` function. It pauses the execution of the function until the promise it's waiting for is resolved, and then resumes the execution of the function. If the promise is rejected, `await` will throw the error, which can be caught using a `try...catch` block