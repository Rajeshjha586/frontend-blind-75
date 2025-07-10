/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */

export default function flatten(value) {
  const result = [];
  const copy = value.slice();

  while (copy.length) {
    const item = copy.shift();

    if (Array.isArray(item)) {
      copy.unshift(...item);
    } else {
      result.push(item);
    }
  }

  return result;
}

// // Single-level arrays are unaffected.
// console.log(flatten([1, 2, 3])); // [1, 2, 3]

// // Inner arrays are flattened into a single level.
// console.log(flatten([1, [2, 3]])); // [1, 2, 3]
// console.log(
//   flatten([
//     [1, 2],
//     [3, 4],
//   ])
// ); // [1, 2, 3, 4]

// // Flattens recursively.
// console.log(flatten([1, [2, [3, [4, [5]]]]])); // [1, 2, 3, 4, 5]
