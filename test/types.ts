import { test } from 'tap';
import { testDetail } from '#test/test-util/format.js';
import * as types from '#src/types.js';
import * as messages from '#src/messages.js';
import { format } from '#src/utils.js';

class TestObject {
	get [Symbol('random property')] () {
		return undefined;
	}
}

const values = {
	bigint: 123n,
	boolean: true,
	function: () => undefined,
	number: 123,
	object: {},
	string: 'abc',
	symbol: Symbol('abc'),
	test: new TestObject(),
};

function testType (
	t: Tap.Test,
	func: (value: unknown) => void,
	message: string,
	...types: ReadonlyArray<keyof typeof values>
) {
	for (const [key, value] of Object.entries(values)) {
		if (types.includes(key as keyof typeof values)) {
			t.doesNotThrow(
				() => {
					func(value);
				},
				`expected to not throw an error for the type: ${key}`,
			);
		} else {
			t.throws(
				() => {
					func(value);
				},
				new TypeError(message),
				`expected to throw an error for the type: ${key}`,
			);
		}
	}
}

await test('isBigInt', async (t) => {
	testType(t, types.isBigInt, messages.notBigInt, 'bigint');

	await testDetail(t, (...args) => {
		types.isBigInt(undefined, ...args);
	}, TypeError, messages.notBigInt);
});

await test('isBoolean', async (t) => {
	testType(t, types.isBoolean, messages.notBoolean, 'boolean');

	await testDetail(t, (...args) => {
		types.isBoolean(undefined, ...args);
	}, TypeError, messages.notBoolean);
});

await test('isFunction', async (t) => {
	testType(t, types.isFunction, messages.notFunction, 'function');

	await testDetail(t, (...args) => {
		types.isFunction(undefined, ...args);
	}, TypeError, messages.notFunction);
});

await test('isInstanceOf', async (t) => {
	testType(t, (value) => {
		types.isInstanceOf(value, TestObject);
	}, format(messages.notInstanceOf, TestObject.name), 'test');

	await testDetail(t, (...args) => {
		types.isFunction(undefined, ...args);
	}, TypeError, messages.notFunction);
});

await test('isNumber', async (t) => {
	testType(t, types.isNumber, messages.notNumber, 'number');

	await testDetail(t, (...args) => {
		types.isNumber(undefined, ...args);
	}, TypeError, messages.notNumber);
});

await test('isObject', async (t) => {
	testType(t, types.isObject, messages.notObject, 'object', 'test');

	await testDetail(t, (...args) => {
		types.isObject(undefined, ...args);
	}, TypeError, messages.notObject);
});

await test('isString', async (t) => {
	testType(t, types.isString, messages.notString, 'string');

	await testDetail(t, (...args) => {
		types.isString(undefined, ...args);
	}, TypeError, messages.notString);
});

await test('isSymbol', async (t) => {
	testType(t, types.isSymbol, messages.notSymbol, 'symbol');

	await testDetail(t, (...args) => {
		types.isSymbol(undefined, ...args);
	}, TypeError, messages.notSymbol);
});
