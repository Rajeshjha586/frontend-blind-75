/**
 * @param {any} val
 * @param {Array<string>} keys
 * @returns any
 */
export default function deepOmit(val, keys) {
  if (val === null || typeof val !== "object") {
    return val;
  }

  if (Array.isArray(val)) {
    return val.map((item) => deepOmit(item, keys));
  }

  const newObject = {};
  for (const key in val) {
    if (Object.prototype.hasOwnProperty.call(val, key)) {
      if (!keys.includes(key)) {
        newObject[key] = deepOmit(val[key], keys);
      }
    }
  }

  return newObject;
}
