function partial(func, ...args) {
  return function (...newArgs) {
    const iterator = newArgs[Symbol.iterator]();

    const finalArgs = [...args].map((val) =>
      val === partial.placeholder ? iterator.next().value : val
    );

    return func.apply(this, [...finalArgs, ...iterator]);
  };
}

partial.placeholder = Symbol();

const _ = partial.placeholder;

const func = (...args) => args;
const func123 = partial(func, 1, 2, 3);
console.log(func123(4));
const func1_3 = partial(func, 1, _, 3);
console.log(func1_3(2, 4));
