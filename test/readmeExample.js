import FlatObject from '../lib/index.js';

var data = {
  "foo": "bar",
  "bar": [
    {
      "c": "d",
      "foo": "d"
    }
  ]
};

const flatData = FlatObject.flatten(data);
console.log(flatData);
/*
{ 
  foo: 'bar',
  'bar[0].c': 'd',
  'bar[0].foo': 'd'
}
*/

for (let key in flatData) {
  if (key.includes('foo')) {
    flatData[key] = `Updated ${flatData[key]}`;
  }
}
data = FlatObject.unflatten(flatData);
console.log(data);