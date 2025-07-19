/**
 * @param {Array<string>} items
 * @param {{sorted?: boolean, length?: number, unique?: boolean}} [options]
 * @return {string}
 */
export default function listFormat(items, options) {
  let { sorted, length, unique } = options ?? {};

  //Step:1 Filter out empty string if its exists in array
  let processed = items.filter(Boolean);

  //Step:2 Remove duplicates if unique flag is true
  if (unique) {
    const list = new Set();
    processed = processed.filter((item) => {
      if (list.has(item)) {
        return false;
      }

      list.add(item);
      return true;
    });
  }

  //Step:3 Sort if the sorted flag is true
  if (sorted) {
    processed.sort();
  }

  const totalLength = processed.length;

  //Step:4 Handle length limit if length is defined
  if (typeof length === "number" && length > 0 && length < totalLength) {
    const visibleItem = processed.slice(0, length);
    const othersCount = totalLength - length;
    const othersLabel = `${othersCount} other${othersCount > 1 ? "s" : ""}`;
    return `${visibleItem.join(", ")} and ${othersLabel}`;
  }

  //Step:5 Return formatted string based on count
  if (totalLength === 0) {
    return "";
  }

  if (totalLength === 1) {
    return processed[0];
  }

  if (totalLength === 0) {
    return `${processed[0]} and ${processed[1]}`;
  }

  const last = processed.pop();
  return `${processed.join(", ")} and ${last}`;
}

/*******Test Cases********* */
// listFormat([]); // ''

// listFormat(["Bob"]); // 'Bob'
// listFormat(["Bob", "Alice"]); // 'Bob and Alice'

// listFormat(["Bob", "Ben", "Tim", "Jane", "John"]);
// // 'Bob, Ben, Tim, Jane and John'

// listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
//   length: 3,
// }); // 'Bob, Ben, Tim and 2 others'

// listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
//   length: 4,
// }); // 'Bob, Ben, Tim, Jane and 1 other'

// listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
//   length: 3,
//   sorted: true,
// }); // 'Ben, Bob, Jane and 2 others'

// listFormat(["Bob", "Ben", "Tim", "Jane", "John", "Bob"], {
//   length: 3,
//   unique: true,
// }); // 'Bob, Ben, Tim and 2 others'

// listFormat(["Bob", "Ben", "Tim", "Jane", "John"], {
//   length: 3,
//   unique: true,
// }); // 'Bob, Ben, Tim and 2 others'

// listFormat(["Bob", "Ben", "", "", "John"]); // 'Bob, Ben and John'
