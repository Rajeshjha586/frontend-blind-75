export function isArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
}

export function isFunction(value) {
  return Object.prototype.toString.call(value) === "[object Function]";
}

export function isObject(value) {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
}

export function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
