'use strict';
import fs from 'fs';
import objectDepth from 'object-depth';
import {expect} from 'chai';
import FlatObject from '../lib/index.js';

const file = './test/sample.json';

describe('object manipulation', () => {
  it('should flatten the object', (done) => {
    fs.readFile(file, 'utf8', (err,data) => {
      data = JSON.parse(data);
      const flatData = FlatObject.flatten(data);
      console.log(flatData);
      const depth = objectDepth(flatData);
      expect(depth).to.equal(1);
      done();
    });
  });

  it("should add 'Updated' to value to 'foo' keys", (done) => {
    fs.readFile(file, 'utf8', (err,data) => {
      data = JSON.parse(data);
      const flatData = FlatObject.flatten(data);
      for (let key in flatData) {
        if (key.includes('foo')) {
          flatData[key] = `Updated ${flatData[key]}`;
        }
      }

      for (let key in flatData) {
        if (key.includes('foo')) {
          expect(flatData[key]).to.have.string('Updated');
        }
      }
      done();
    });
  });

  it('should unflatten the object', (done) => {
    fs.readFile(file, 'utf8', (err,data) => {
      data = JSON.parse(data);
      const flatData = FlatObject.flatten(data);
      for (let key in flatData) {
        if (key.includes('foo')) {
          flatData[key] = `Updated ${flatData[key]}`;
        }
      }
      data = FlatObject.unflatten(flatData);
      const depth = objectDepth(data);
      expect(data.foo).to.have.string('Updated');
      done();
    });
  });

});
