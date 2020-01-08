class Expect {
  constructor(expected = null) {
    this.expected = expected;
    this.not = new Not(expected)
  }

  toBe = actual => {
    validateAssertion(this.expected, actual);
    if (this.expected === actual) {
      console.log(`    expected ${this.expected} to be ${actual} :: Test Passed`); return true;
    } else {
      console.log(`    expected ${this.expected} to be ${actual} :: Test Failed`); return false;
    };
  }

  toEqual = actual => {
    validateAssertion(this.expected, actual);
    if (this.expected == actual) {
      console.log(`    expected ${this.expected} to equal ${actual} :: Test Passed`); return true;
    } else {
      console.log(`    expected ${this.expected} to equal ${actual} :: Test Failed`); return false;
    };
  }

  toContain = actual => {
    validateAssertion(this.expected, actual);
    let result = true;
    if (typeof actual === 'object') {
      try {
        actual.forEach(el => {
          result = result && this.expected.includes(el);
        });
        if (result) { 
          console.log(`    expected ${this.expected} to contain ${actual} :: Test Passed`); return true;
        }
      } catch (e) {
        throw new Error('Invalid assertion');
      }
    } else if (this.expected.includes(actual)) { 
      console.log(`    expected ${mapArrayToString(this.expected)} to contain ${actual} :: Test Passed`); return true;
    };
    console.log(`    expected ${mapArrayToString(this.expected)} to contain ${actual} :: Test Failed`); return false;
  }

  toAllBe = actual => {
    validateAssertion(this.expected, actual);
    let result = true;
    try {
      this.expected.forEach(el => {
        result = result && el === actual;
      });
      if (result) { 
        console.log(`    expected ${mapArrayToString(this.expected)} to all be ${actual} :: Test Passed`); return true;
      }
    } catch (e) {
      throw new Error('Invalid assertion');
    }
    console.log(`    expected ${mapArrayToString(this.expected)} to all be ${actual} :: Test Failed`); return false;
  }

  toThrowError = () => {
    try {
      this.expected();
      console.log(`    expected function to throw an error :: Test Failed`); return false;
    } catch (e) {
      console.log(`    expected function to throw an error :: Test Passed`); return true;
    }
  }

  toBeTruthy = () => {
    if (this.expected) {
      console.log(`    expected ${this.expected} to be truthy :: Test Passed`); return true;
    } else {
      console.log(`    expected ${this.expected} to be truthy :: Test Failed`); return false;
    }
  }

  toBeFalsy = () => {
    if (!this.expected) {
      console.log(`    expected ${this.expected} to be falsy :: Test Passed`); return true;
    } else {
      console.log(`    expected ${this.expected} to be falsy :: Test Failed`); return false;
    }
  }

  toResemble = actual => {
    try {
      compareProperties(this.expected, actual);
      console.log(`    expected both functions to deeply contain the same keys :: Test Passed`); return true;
    } catch (e) {
      console.log(`    expected both functions to deeply contain the same keys :: Test Failed`); return false;
    }
  }

  toHaveLength = length => {
    if (this.expected.length === length) {
      console.log(`    expected ${mapArrayToString(this.expected)} to have length ${length} :: Test Passed`); return true;
    } else {
      console.log(`    expected ${mapArrayToString(this.expected)} to have length ${length} :: Test Failed`); return false;
    }
  }

  toChange = actual => {
    let initState = JSON.parse(JSON.stringify(actual));
    
    const changer = (element) => {
      this.expected();
      return element;
    }

    console.log('changer: ' + changer(actual))
    
    console.log(this.expected())
    const change = initState - actual;

    const byObject = {
      actual: actual,
      change: change,
      by(num) {
        if (initState.length === num) {
          console.log(`    expected value to change by ${num} :: Test Passed`); return true;
        } else {
          console.log(`    expected value to change by ${num} :: Test Failed`); return false;
        };
      },
    };

    return byObject;
  }
}

const expect = (expected) => {
  return new Expect(expected);
}
