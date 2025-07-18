/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {any}
 */
Function.prototype.myCall = function (thisArg, ...args) {
  // thisArg can be null or defined.
  thisArg = thisArg ?? window;

  // Transform primitive value into object, so that we can add property.
  thisArg = Object(thisArg);

  // Create a unique property name.
  const fn = Symbol();

  // Assign the function that has to be called to the unique property.
  thisArg[fn] = this;

  // Call the function as a method to get the correct context.
  const returnValue = thisArg[fn](...args);

  // Delete the unique property so that the original thisArg is not affected.
  delete thisArg[fn];
  return returnValue;
};
