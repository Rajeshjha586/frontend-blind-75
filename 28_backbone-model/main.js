import BackboneModel from "./backbone-model.js";

// Instantiate the BackboneModel.
const person = new BackboneModel({ name: "John", age: 30 });

// Log initial values.
console.log(person.get("name")); // "John"
console.log(person.get("age")); // 30

// Set new values.
person.set("name", "Jane");
person.set("age", 25);

// Log updated values.
console.log(person.get("name")); // "Jane"
console.log(person.get("age")); // 25

// Check if the model has a specific attribute.
console.log(person.has("name")); // true
console.log(person.has("gender")); // false

// Unset an attribute.
person.unset("age");
console.log(person.get("age")); // undefined

function nameChangeCallback(attribute, newName, oldName) {
  console.log(`'${attribute}' changed from '${newName}' to '${oldName}'`);
}
// Register an event listener for a change in the `name` field.
person.on("change", "name", nameChangeCallback);

// Trigger the 'change' event for the 'name' attribute.
person.set("name", "Bob");
// > "'name' changed from 'Jane' to 'Bob'"

// Remove an event listener for the 'name' attribute.
person.off("name", nameChangeCallback);

// Trigger the 'change' event again.
person.set("name", "Alice");
// No output because the listener was removed.
