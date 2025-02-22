const EventEmitter = require("events");

class customListener extends EventEmitter{
  constructor(){
    super();
    this.greeting = "Hello";
  }

  greet(name){
    this.emit("greeting", `${this.greeting}, ${name}`)
  }
}

const myCustomEmitter = new customListener()

myCustomEmitter.on("greeting", (input) => {
  console.log(`Greeting event`, input);
});

myCustomEmitter.greet("aklesh")