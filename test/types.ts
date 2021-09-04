import { test } from 'tap';
import { testDetail } from './test-util/format.js';
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
	testType(t, types.isBigInt, messages.NOT_BIGINT, 'bigint');

	await testDetail(t, (...args) => {
		types.isBigInt(undefined, ...args);
	}, TypeError, messages.NOT_BIGINT);
});

await test('isBoolean', async (t) => {
	testType(t, types.isBoolean, messages.NOT_BOOLEAN, 'boolean');

	await testDetail(t, (...args) => {
		types.isBoolean(undefined, ...args);
	}, TypeError, messages.NOT_BOOLEAN);
});

await test('isFunction', async (t) => {
	testType(t, types.isFunction, messages.NOT_FUNCTION, 'function');

	await testDetail(t, (...args) => {
		types.isFunction(undefined, ...args);
	}, TypeError, messages.NOT_FUNCTION);
});

await test('isInstanceOf', async (t) => {
	testType(t, (value) => {
		types.isInstanceOf(value, TestObject);
	}, format(messages.NOT_INSTANCE_OF, TestObject.name), 'test');

	await testDetail(t, (...args) => {
		types.isFunction(undefined, ...args);
	}, TypeError, messages.NOT_FUNCTION);
});

await test('isNumber', async (t) => {
	testType(t, types.isNumber, messages.NOT_NUMBER, 'number');

	await testDetail(t, (...args) => {
		types.isNumber(undefined, ...args);
	}, TypeError, messages.NOT_NUMBER);
});

await test('isObject', async (t) => {
	testType(t, types.isObject, messages.NOT_OBJECT, 'object', 'test');

	await testDetail(t, (...args) => {
		types.isObject(undefined, ...args);
	}, TypeError, messages.NOT_OBJECT);
});

await test('isString', async (t) => {
	testType(t, types.isString, messages.NOT_STRING, 'string');

	await testDetail(t, (...args) => {
		types.isString(undefined, ...args);
	}, TypeError, messages.NOT_STRING);
});

await test('isSymbol', async (t) => {
	testType(t, types.isSymbol, messages.NOT_SYMBOL, 'symbol');

	await testDetail(t, (...args) => {
		types.isSymbol(undefined, ...args);
	}, TypeError, messages.NOT_SYMBOL);
});
