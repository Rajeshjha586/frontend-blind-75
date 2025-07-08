/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {U}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  const hasInitialValue = arguments.length > 1;

  if (!hasInitialValue && this.length === 0) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let accumulator = hasInitialValue ? initialValue : this[0];

  for (let index = hasInitialValue ? 0 : 1; index < this.length; index++) {
    if (index in this) {
      accumulator = callbackFn(accumulator, this[index], index, this);
    }
  }

  return accumulator;
};

// console.log([1, 2, 3, , , , , , 5].myReduce((prev, curr) => prev + curr, 9));
