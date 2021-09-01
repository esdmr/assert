import { test } from 'tap';
import * as types from '#src/types.js';
import * as messages from '#src/messages.js';

const values = {
	bigint: 123n,
	boolean: true,
	function: () => undefined,
	number: 123,
	object: {},
	string: 'abc',
	symbol: Symbol('abc'),
};

function testType (
	t: Tap.Test,
	func: (value: unknown) => void,
	message: string,
	type: keyof typeof values,
) {
	for (const [key, value] of Object.entries(values)) {
		if (key === type) {
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
});

await test('isBoolean', async (t) => {
	testType(t, types.isBoolean, messages.NOT_BOOLEAN, 'boolean');
});

await test('isFunction', async (t) => {
	testType(t, types.isFunction, messages.NOT_FUNCTION, 'function');
});

await test('isNumber', async (t) => {
	testType(t, types.isNumber, messages.NOT_NUMBER, 'number');
});

await test('isObject', async (t) => {
	testType(t, types.isObject, messages.NOT_OBJECT, 'object');
});

await test('isString', async (t) => {
	testType(t, types.isString, messages.NOT_STRING, 'string');
});

await test('isSymbol', async (t) => {
	testType(t, types.isSymbol, messages.NOT_SYMBOL, 'symbol');
});
