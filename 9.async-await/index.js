// Function to delay execution by a specified time using a Promise
function delayFn(time) {
  // Returns a Promise that resolves after the specified time (in milliseconds)
 return new Promise((resolve) => setTimeout(resolve, time));
};

async function greet(name){
  await delayFn(2000);
  console.log(`Hello, there ${name}`)
}

greet("Jhon")

async function divide(num1, num2){
  try {
    if(num2 === 0) throw new Error("Zero is not divisible!");
    return num1/num2;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

async function mainFn() {
  console.log(await divide(10, 2))
  console.log(await divide(10, 0))
}

mainFn();