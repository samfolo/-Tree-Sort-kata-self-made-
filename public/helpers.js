const validateAssertion = (expected, actual) => {
  if (!actual && !expected) { throw new Error('No assertion made') };
  if (!actual) { throw new Error('No actual value given in this assertion') };
  if (!expected) { throw new Error('No expected value given in this assertion') };
}

const mapArrayToString = (arr) => {
  if (!arr || typeof arr !== 'object') { return arr; }

  if (arr.length < 1) {
    return JSON.stringify(arr);
  } else if (arr.length > 1) {
    return '[' + arr.join(', ') + ']';
  } else {
    try { return `${arr.pop}` } catch (e) { return arr };
  } 
}

const comparePropertiesLogic = (expected, actual) => {
  let expectedKeys = Object.keys(expected);
  let actualKeys = Object.keys(actual);

  if (actualKeys.length === expectedKeys.length) {
    let result = true;
    expectedKeys.forEach(key => {
      result = result && actual.hasOwnProperty(key);

      if (result && typeof actual[key] === 'object') {
        compareProperties(expected[key], actual[key]);
      } else if (result && Array.isArray(actual[key])) {
        expected[key].forEach((child, i) => {
          compareProperties(expected[key][i], actual[key][i]);
        });
      };
      if (!result) { throw Error }
    })
  } else { throw Error }
}

const compareProperties = (expected, actual) => {
  // console.log(`expected: ${JSON.stringify(expected)}`);
  // console.log(`actual: ${JSON.stringify(actual)}`);
  
  try {
    Array.isArray(actual) ? 
    actual.forEach((_, objIndex) => { comparePropertiesLogic(expected[objIndex], actual[objIndex]); }) :
    comparePropertiesLogic(expected, actual);
  } catch (e) { throw Error }
}