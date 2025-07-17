/**
 * @param {Element} element
 * @param {string} property
 * @param {string} value
 * @return {Array<Element>}
 */

const getPropertyComputedValue = (property, value) => {
  // create a new element
  const div = document.createElement("div");

  // apply the property to the element
  div.style[property] = value;

  // get the computed style of the div
  const styles = window.getComputedStyle(document.body.appendChild(div));

  // get the computed value of the property
  let computedValue = styles[property];

  // remove the div
  document.body.removeChild(div);

  // return the computed value
  return computedValue;
};

export default function getElementsByStyle(element, property, value) {
  // get the computed value of the property, this will make sure we are checking the values that are applied in the browser
  const computedValue = getPropertyComputedValue(property, value);

  // to store the result
  const result = [];

  // helper function to traverse the DOM
  const search = (element, property, value, isRoot = false) => {
    // get the computed styles of the element
    let computedStyles = window.getComputedStyle(element);
    let elementPropertyValue = computedStyles[property];

    // if both the values match
    // store the result
    if (!isRoot && elementPropertyValue === computedValue) {
      result.push(element);
    }

    // recursively search for each child of the element
    for (const child of element.children) {
      search(child, property, value, false);
    }
  };

  // begin the search
  search(element, property, value, true);

  // return the result
  return result;
}
