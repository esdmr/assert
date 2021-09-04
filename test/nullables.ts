import { test } from 'tap';
import { testDetail } from './test-util/format.js';
import * as nullables from '#src/nullables.js';
import * as messages from '#src/messages.js';

await test('isNotNull', async (t) => {
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

	await testDetail(t, (...args) => {
		nullables.isNotNull(null, ...args);
	}, TypeError, messages.IS_NULL);
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

	await testDetail(t, (...args) => {
		nullables.isNonNullable(undefined, ...args);
	}, TypeError, messages.IS_NULLABLE);
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

	await testDetail(t, (...args) => {
		nullables.isNotUndefined(undefined, ...args);
	}, TypeError, messages.IS_UNDEFINED);
});
