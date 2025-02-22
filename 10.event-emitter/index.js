const EventEmitter = require("events");

const firstEmitter = new EventEmitter();

// register a listener
firstEmitter.on("Greet", (name) => {
  console.log(`Hello there ${name}`);
});

firstEmitter.emit("Greet", "Krishna")