import { test } from 'tap';
import { testDetail, testFormat } from './test-util/format.js';
import * as assert from '#src/assert.js';
import { AssertionError, WrappedError } from '#src/errors.js';
import * as messages from '#src/messages.js';
import { format } from '#src/utils.js';

await test('assert', async (t) => {
	t.doesNotThrow(
		() => {
			assert.assert(true, 'This should not throw');
		},
		'expected to not throw if condition is true',
	);

	t.throws(
		() => {
			assert.assert(false);
		},
		new AssertionError(messages.DEFAULT_MESSAGE),
		'expected to throw the default message if condition is false',
	);

	await testFormat(t, (...args) => {
		assert.assert(false, ...args);
	}, (message: string) => new AssertionError(message));
});

await test('wrap', async (t) => {
	t.strictSame(assert.wrap('value'), assert.wrap('value', messages.DEFAULT_MESSAGE),
		'expected to use the default message if not given one');

	await testFormat(t, (...args) => {
		throw assert.wrap('value', ...args);
	}, (message: string) => new WrappedError(message, 'value'));
});

await test('isEqual', async (t) => {
	t.doesNotThrow(
		() => {
			assert.isEqual(0, 0);
		},
		'expected not to throw for equal values',
	);

	t.throws(
		() => {
			assert.isEqual(true, false);
		},
		new AssertionError(format(messages.NOT_EQUAL, false)),
		'expected to throw for not equal values',
	);

	t.throws(
		() => {
			assert.isEqual<number | boolean>(0, false);
		},
		new AssertionError(format(messages.NOT_EQUAL, false)),
		'expected to throw for not equal types with same value',
	);

	await testDetail(t, (...args) => {
		assert.isEqual(true, false, ...args);
	}, (message: string) => new AssertionError(message), format(messages.NOT_EQUAL, false));
});

await test('isNotEqual', async (t) => {
	t.throws(
		() => {
			assert.isNotEqual(0, 0);
		},
		new AssertionError(format(messages.IS_EQUAL, 0)),
		'expected to throw for equal values',
	);

	t.doesNotThrow(
		() => {
			assert.isNotEqual(true, false);
		},
		'expected to not throw for not equal values',
	);

	t.doesNotThrow(
		() => {
			assert.isNotEqual<number | boolean>(0, false);
		},
		'expected to not throw for not equal types with same value',
	);

	await testDetail(t, (...args) => {
		assert.isNotEqual(false, false, ...args);
	}, (message: string) => new AssertionError(message), format(messages.IS_EQUAL, false));
});
