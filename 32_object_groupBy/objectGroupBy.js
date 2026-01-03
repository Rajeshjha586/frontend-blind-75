function ObjectGroupBy(items, callback) {
  return items.reduce((newObj, item) => {
    let targetKey = callback(item);

    if (!newObj[targetKey]) {
      newObj[targetKey] = new Array();
    }

    newObj[targetKey].push(item);

    return newObj;
  }, Object.create(null));
}

const items = [
  {
    id: 1,
    kind: "a",
  },
  {
    id: 2,
    kind: "b",
  },
  {
    id: 3,
    kind: "a",
  },
];
const groups = ObjectGroupBy(items, ({ kind }) => kind);
console.log(groups);
console.log(
  ObjectGroupBy([0, 1, 2, 3, 4, 5], (item) => (item % 2 === 0 ? "even" : "odd"))
);
