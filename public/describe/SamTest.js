class SamTest {
  static describe = (description, assertion) => {
    console.log('Describe ' + description + ": ");
    assertion();
  };
}

const describe = (description, assertion) => {
  return SamTest.describe(description, assertion);
}