function isSubset(a, b) {
  return Array.from(a).every((value) => b.contains(value));
}

/**
 * @param {Element} element
 * @param {string} classNames
 * @return {Array<Element>}
 */
export default function getElementsByClassName(element, classNames) {
  const elements = [];
  const classNamesSet = new Set(classNames.trim().split(/\s+/));

  function traverse(el) {
    if (el === null) {
      return;
    }

    if (isSubset(classNamesSet, el.classList)) {
      elements.push(el);
    }

    for (const child of el.children) {
      traverse(child);
    }
  }

  for (const child of element.children) {
    traverse(child);
  }

  return elements;
}

// const doc = new DOMParser().parseFromString(
//   `<div class="foo bar baz">
//       <span class="bar baz">Span</span>
//       <p class="foo baz">Paragraph</p>
//       <div class="foo bar"></div>
//     </div>`,
//   "text/html"
// );

// console.log("-----------", getElementsByClassName(doc.body, "foo bar"));
// [div.foo.bar.baz, div.foo.bar] <-- This is an array of elements.
