import * as assert from '@esdmr/assert';

class SpecialObject {}
const array: unknown = new SpecialObject();

assert.isInstanceOf(array, SpecialObject);
