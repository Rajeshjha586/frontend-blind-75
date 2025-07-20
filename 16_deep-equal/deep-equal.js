/**
 * @param {*} valueA
 * @param {*} valueB
 * @return {boolean}
 */
export default function deepEqual(valueA, valueB) {
  //Step: 1 Verify NaN values
  if (Number.isNaN(valueA) && Number.isNaN(valueB)) {
    return true;
  }

  //Step: 2 Verify Undefined values
  if (valueA === "undefined" || valueB === "undefined") {
    return valueA === valueB;
  }

  //Step: 3 Verify Null values
  if (valueA === null || valueB === null) {
    return valueA === valueB;
  }

  //Step: 4 Verify Array values
  if (Array.isArray(valueA) && Array.isArray(valueB)) {
    if (valueA.length !== valueB.length) {
      return false;
    }

    for (let i = 0; i < valueA.length; i++) {
      if (!deepEqual(valueA[i], valueB[i])) {
        return false;
      }
    }

    return true;
  }

  if (Array.isArray(valueA) || Array.isArray(valueB)) {
    return false;
  }

  //Step: 5 Verify Object values
  if (typeof valueA === "object" && typeof valueB === "object") {
    const objAKeys = Object.keys(valueA);
    const objBKeys = Object.keys(valueB);

    if (objAKeys.length !== objBKeys.length) {
      return false;
    }

    for (const key of objAKeys) {
      if (objBKeys.indexOf(key) < 0) {
        return false;
      }

      if (!deepEqual(valueA[key], valueB[key])) {
        return false;
      }
    }

    return true;
  }

  if (typeof valueA === "object" || typeof valueB === "object") {
    return false;
  }

  //Step: 6 Verify Primitives values
  return valueA === valueB;
}
