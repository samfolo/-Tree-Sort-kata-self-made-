describe('treeSort', () => {
  it('turns lower tier siblings into children', () => {
    let testObjA = { tier: 1, value: 'A', children: [], }
    let testObjB = { tier: 2, value: 'A', children: [], }

    let testObjResult = { tier: 1, value: 'A', children: [{ tier: 2, value: 'A', children: [], }], }
    expect(treeSort([testObjA, testObjB])).toResemble(testObjResult);
  })
});