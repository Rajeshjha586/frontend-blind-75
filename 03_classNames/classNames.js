/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */

export default function classNames(...args) {
  const classes = [];

  args.forEach((arg) => {
    //Ignore falsey values;
    if (!arg) {
      return;
    }

    const argType = typeof arg;

    //Handle strings and numbers
    if (argType === "string" || argType === "number") {
      classes.push(arg);
      return;
    }

    //Handle Arrays.
    if (Array.isArray(arg)) {
      classes.push(classNames(...arg));
      return;
    }

    //Handle Objects.
    if (argType === "object") {
      for (const key in arg) {
        if (Object.hasOwn(arg, key) && arg[key]) {
          classes.push(key);
        }
      }

      return;
    }
  });

  return classes.join(" ");
}
