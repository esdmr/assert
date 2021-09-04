import { test } from 'tap';
import { testFormat } from './test-util/format.js';
import { assert, wrap } from '#src/assert.js';
import { AssertionError, WrappedError } from '#src/errors.js';
import { DEFAULT_MESSAGE } from '#src/messages.js';

await test('assert', async (t) => {
	t.doesNotThrow(
		() => {
			assert(true, 'This should not throw');
		},
		'expected to not throw if condition is true',
	);

	t.throws(
		() => {
			assert(false);
		},
		new AssertionError(DEFAULT_MESSAGE),
		'expected to throw the default message if condition is false',
	);

	await testFormat(t, (...args) => {
		assert(false, ...args);
	}, (message: string) => new AssertionError(message));
});

await test('wrap', async (t) => {
	t.strictSame(wrap('value'), wrap('value', DEFAULT_MESSAGE),
		'expected to use the default message if not given one');

	await testFormat(t, (...args) => {
		throw wrap('value', ...args);
	}, (message: string) => new WrappedError(message, 'value'));
});
