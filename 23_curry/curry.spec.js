import curry from "./curry";

const empty = () => 0;
const square = (a) => a * a;
const mul = (a, b) => a * b;
const mulThree = (a, b, c) => a * b * c;

describe("curry", () => {
  test("returns function", () => {
    const curried = curry(square);
    expect(curried).toBeInstanceOf(Function);
  });

  test("empty function", () => {
    const curried = curry(empty);
    expect(curried()).toBe(0);
  });

  test("single argument", () => {
    const curried = curry(square);
    expect(curried()).toBeInstanceOf(Function);
    expect(curried(2)).toBe(4);
  });

  test("two arguments", () => {
    const curried = curry(mul);
    expect(curried()).toBeInstanceOf(Function);
    expect(curried(7)(3)).toBe(21);
  });

  test("multiple arguments", () => {
    const curried = curry(mulThree);
    expect(curried()).toBeInstanceOf(Function);
    expect(curried(7)(3)(2)).toBe(42);
  });

  test("can be reused", () => {
    const curried = curry(square);
    expect(curried()).toBeInstanceOf(Function);
    expect(curried(2)).toBe(4);
    expect(curried(3)).toBe(9);
  });

  test("ignores empty args", () => {
    const curried = curry(mulThree);
    expect(curried()(4)()(3)()(2)).toBe(24);
    expect(curried()()()()(4)(2)(3)).toBe(24);
  });

  describe("can access this", () => {
    test("single parameter", () => {
      const curried = curry(function (val) {
        return this.multiplier * val;
      });

      const obj = { multiplier: 5, mul: curried };
      expect(obj.mul()).toBeInstanceOf(Function);
      expect(obj.mul(7)).toBe(35);
    });

    test("multiple arguments", () => {
      const curried = curry(function (foo, bar) {
        return this.base * foo + bar;
      });

      const obj = { base: 5, mul: curried };
      expect(obj.mul()).toBeInstanceOf(Function);
      expect(obj.mul(3)(2)).toBe(17);
      expect(obj.mul(3)()(2)).toBe(17);
      expect(obj.mul()(3)()(2)).toBe(17);
    });
  });
});
