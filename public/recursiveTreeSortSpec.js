describe('treeSort', () => {
  it('can sort one lower tier object and one parent object', () => {
    let testObjA = { tier: 1, value: 'A', children: [], }
    let testObjB = { tier: 2, value: 'A', children: [], }

    let testObjResult = [{ tier: 1, value: 'A', children: [{ tier: 2, value: 'A', children: [], }], }]
    expect(treeSort([testObjA, testObjB])).toResemble(testObjResult);
  });

  it('can sort two lower tier objects and one parent object', () => {
    let testObjA = { tier: 1, value: 'F', children: [], }
    let testObjB = { tier: 2, value: 'F', children: [], }
    let testObjC = { tier: 2, value: 'F', children: [], }
    let testObjResult = [
      { tier: 1, value: 'F', children: [
        { tier: 2, value: 'F', children: [], }, 
        { tier: 2, value: 'F', children: [], }
      ], }
    ]

    expect(treeSort([testObjA, testObjB, testObjC])).toResemble(testObjResult);
  });

  it('can sort two differently valued lower tier objects and one parent object', () => {
    let testObjA = { tier: 2, value: 'G', children: [], }
    let testObjB = { tier: 3, value: 'G', children: [], }
    let testObjC = { tier: 3, value: 'R', children: [], }
    let testObjResult = [
      { tier: 2, value: 'G', children: [ { tier: 3, value: 'G', children: [], }, ], },
      { tier: 2, value: 'R', children: [], },
    ]

    expect(treeSort([testObjA, testObjB, testObjC])).toResemble(testObjResult);
  });
});