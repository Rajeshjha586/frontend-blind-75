/**
 * @param {*} value
 * @return {string}
 */
export default function jsonStringify(value) {
  if (typeof value === "bigint") {
    throw new Error("Do not know how to serialize a BigInt at JSON.stringify");
  }
  if (typeof value === "string") {
    return `"${value}"`;
  }
  if (typeof value === "function") {
    return undefined;
  }
  if (value !== value) {
    return "null";
  }
  if (value === Infinity) {
    return "null";
  }
  if (value === -Infinity) {
    return "null";
  }
  if (typeof value === "number") {
    return `${value}`;
  }
  if (typeof value === "boolean") {
    return `${value}`;
  }
  if (value === null) {
    return "null";
  }
  if (value === undefined) {
    return "null";
  }
  if (typeof value === "symbol") {
    return "null";
  }
  if (value instanceof Date) {
    return `"${value.toISOString()}"`;
  }
  if (Array.isArray(value)) {
    const arr = value.map((el) => jsonStringify(el));
    return `[${arr.join(",")}]`;
  }
  if (typeof value === "object") {
    const arr = Object.entries(value).reduce((acc, [key, value]) => {
      if (value === undefined) {
        return acc;
      }
      acc.push(`"${key}":${jsonStringify(value)}`);
      return acc;
    }, []);
    return `{${arr.join(",")}}`;
  }
}
