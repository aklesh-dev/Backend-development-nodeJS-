## EventEmitter
EventEmitter is a core module in Node.js that facilitates communication between objects in a Node.js application. It is part of the events module and is used to handle and emit custom events. This pattern is particularly useful for implementing event-driven programming, where certain actions or changes in the application trigger events that other parts of the application can listen to and respond to.

Key Concepts of EventEmitter:

1. #### `EventEmitter Class:`
- The EventEmitter class is used to create objects that can emit events. You can create an instance of EventEmitter and use it to emit events and register listeners for those events.

2. #### `Event Listeners:`
- Event listeners are functions that are executed when a specific event is emitted. You can register event listeners using the on or addListener methods.

3. #### `Emitting Events:`
- Events can be emitted using the emit method. When an event is emitted, all registered listeners for that event are called in the order they were registered.

4. #### `Removing Listeners:`

- You can remove event listeners using the removeListener or off methods. This is useful for cleaning up listeners when they are no longer needed.

### Example Usage:
```javascript
const EventEmitter = require('events');

// Create an instance of EventEmitter
const myEmitter = new EventEmitter();

// Register an event listener for the 'greet' event
myEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit the 'greet' event
myEmitter.emit('greet', 'Alice');  // Output: Hello, Alice!

```

#### Common Methods:
`on(eventName, listener):` 
Adds a listener function for the specified event.

`once(eventName, listener):` Adds a one-time listener that is automatically removed after it is called.

`emit(eventName, [...args]):` Emits the event, calling all registered listeners with the provided arguments.

`removeListener(eventName, listener):` Removes a specific listener for the event.

`removeAllListeners([eventName]):` Removes all listeners for the specified event (or all events if no event name is provided).