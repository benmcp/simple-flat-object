Simple Flat Object
=========

A small library that converts an object into a flat (depth=1) object. Useful if you need to change the values of all instances of a key with the same name.

## Installation

  `yarn install`

## Usage

```
import FlatObject from 'simple-flat-object';

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
/*
{ 
  foo: 'Updated bar',
  bar: [
    {
      c: 'd',
      foo: 'Updated d'
    }
  ]
}
*/

```

## Tests

### Unit

Unit tests use the Mocha test framework with Chai assertions. To run the tests, execute the following command in the top-level application directory:

  `npm test`
