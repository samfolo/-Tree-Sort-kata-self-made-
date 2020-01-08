class It {
  static assert = (description, assertion) => {
    console.log('  it ' + description + ': ');
    assertion();
  };
}

const it = (description, assertion) => {
  return It.assert(description, assertion);
}