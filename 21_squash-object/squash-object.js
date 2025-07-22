/**
 * @param {Object} obj
 * @return {Object}
 */
export default function squashObject(obj, parentKey = "") {
  let outputObject = {};

  for (let key in obj) {
    const value = obj[key];
    const newKey =
      parentKey && key !== "" ? `${parentKey}.${key}` : key || parentKey;

    const isObject =
      typeof value === "object" && value !== null && !Array.isArray(value);

    if (isObject) {
      Object.assign(outputObject, squashObject(value, newKey));
    } else if (Array.isArray(value)) {
      value.forEach((val, index) => {
        const arrayKey = `${newKey}.${index}`;

        if (typeof val === "object" && val !== null && !Array.isArray(val)) {
          Object.assign(outputObject, squashObject(val, arrayKey));
        } else {
          outputObject[arrayKey] = val;
        }
      });
    } else {
      outputObject[newKey] = value;
    }
  }

  return outputObject;
}
