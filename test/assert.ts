import { test } from 'tap';
import { assert } from '#src/assert.js';
import { AssertionError } from '#src/errors.js';
import { DEFAULT_MESSAGE } from '#src/messages.js';

await test('assert', async (t) => {
	t.doesNotThrow(() => {
		assert(true, 'This should not throw');
	}, 'expected to not throw if condition is true');

	t.throws(() => {
		assert(false, 'This should throw');
	}, 'expected to throw if condition is true');

	t.throws(() => {
		assert(false);
	}, new AssertionError(DEFAULT_MESSAGE));

	t.throws(() => {
		assert(false, 'Custom message (arity 0)');
	}, new AssertionError('Custom message (arity 0)'));

	t.throws(() => {
		assert(false, '1{}3 (arity 1)', '(2)');
	}, new AssertionError('1(2)3 (arity 1)'));

	t.throws(() => {
		assert(false, '1{}3{}5 (arity 2)', '(2)', '(4)');
	}, new AssertionError('1(2)3(4)5 (arity 2)'));
});
