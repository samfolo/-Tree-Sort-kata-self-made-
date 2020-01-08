// create a function which can sort the following objects:

let objA = { tier: 1, value: 'A', children: [], }
let objB = { tier: 2, value: 'A', children: [], }
let objC = { tier: 3, value: 'B', children: [], }
let objD = { tier: 2, value: 'B', children: [], }
let objE = { tier: 3, value: 'A', children: [], }
let objF = { tier: 4, value: 'A', children: [], }
let objG = { tier: 2, value: 'A', children: [], }
let objH = { tier: 3, value: 'B', children: [], }

// like this:

let exampleSort = [
  {
    tier: 1,
    value: 'A',
    children: [{
      tier: 2,
      value: 'A',
      children: [{
        tier: 3,
        value: 'A',
        children: [{
          tier: 4,
          value: 'A',
          children: [],
        }],
      }],
    },
    {
      tier: 2,
      value: 'A',
      children: [],
    }],
  },
  {
    tier: 2,
    value: 'B',
    children: [{
      tier: 3,
      value: 'B',
      children: [],
    },
    {
      tier: 3,
      value: 'B',
      children: [],
    }],
  }
]

// - if an object has a higher tier (lower number) than another, the lower tier should be moved to the higher's children array

// - if two objects have the same tier and value, they should exist on the same level

// - objects can only be nested within other objects of the same value

// - if two objects are candidates for parenthood, only push the child to the first candidate, unless they have an object with
// the same tier and value, in which case pass it to the next available candidate.

// - if two objects are candidates for childhood and there are not enough parents, they can belong to the same parent
const without = (el, arr) => {
  const target = arr.filter(e => e === el)[0];
  const elIndex = arr.indexOf(target);
  return [
    ...arr.slice(0, elIndex),
    ...arr.slice(elIndex + 1, arr.length),
  ];
}

const kinObjects = (objectA, objectB) => {
  return objectA.value === objectB.value;
}



const treeSort = objArr => {
  let resArr = [...objArr];

  for (let i = 0; i < resArr.length; i++) {
    let exResArr = without(resArr[i], resArr);

    for (let j = 0; j < exResArr.length; j++) {
      if (
        resArr[i].tier < exResArr[j].tier && 
        !resArr[i].children.includes(exResArr[j].tier) && 
        kinObjects(resArr[i], exResArr[j])
        ) {
        resArr[i].children.push(exResArr[j])
        resArr = without(exResArr[j], resArr);
        for (let k = 0; k < resArr[i].children.length; k++) {
          treeSort(resArr[i].children);
        }
      }
    }
  }

  console.log(resArr)
  return resArr;
};