import { test } from 'tap';
import * as nullables from '#src/nullables.js';
import * as messages from '#src/messages.js';

await test('isNull', async (t) => {
	t.throws(
		() => {
			nullables.isNotNull(null);
		},
		new TypeError(messages.IS_NULL),
		'expected to throw an error if the value is null',
	);

	t.doesNotThrow(
		() => {
			nullables.isNotNull(undefined);
		},
		'expected to not throw an error if the value is not null',
	);
});

await test('isNonNullable', async (t) => {
	t.throws(
		() => {
			nullables.isNonNullable(null);
		},
		new TypeError(messages.IS_NULLABLE),
		'expected to throw an error if the value is null',
	);

	t.throws(
		() => {
			nullables.isNonNullable(undefined);
		},
		new TypeError(messages.IS_NULLABLE),
		'expected to throw an error if the value is undefined',
	);

	t.doesNotThrow(
		() => {
			nullables.isNonNullable(123);
		},
		'expected to not throw an error if the value is not nullable',
	);
});

await test('isNotUndefined', async (t) => {
	t.throws(
		() => {
			nullables.isNotUndefined(undefined);
		},
		new TypeError(messages.IS_UNDEFINED),
		'expected to throw an error if the value is undefined',
	);

	t.doesNotThrow(
		() => {
			nullables.isNotUndefined(null);
		},
		'expected to not throw an error if the value is not undefined',
	);
});
