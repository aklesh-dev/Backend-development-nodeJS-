// Function to delay execution by a specified time using a Promise
function delayFn(time) {
   // Returns a Promise that resolves after the specified time (in milliseconds)
  return new Promise((resolve) => setTimeout(resolve, time));
};

console.log("Promise function start.")
delayFn(2000).then(() => { console.log("After 2 second promise resolve") });
console.log("End.");

// Function to perform division with error handling using a Promise
// catch error 
function divideFn(num1, num2) {
  // Returns a Promise that resolves with the result of the division if successful
  // or rejects with an error message if division by zero is attempted
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
      reject("Cannot perform division by zero.")
    }
    else {
      resolve(num1 / num2);
    }
  });
};

divideFn(10, 0).then(result => { console.log("Result:",result) }).catch(err => console.log("Error:", err));