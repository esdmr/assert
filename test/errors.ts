import { test } from 'tap';
import * as errors from '#src/errors.js';

const message = 'Custom error message here';
const wrapperMessage = 'Context message here';

await test('AssertionError', async (t) => {
	const error = new errors.AssertionError(message);

	t.equal(error.name, 'AssertionError',
		'expected to have a correct name');

	t.equal(error.message, message,
		'expected to have a correct message');

	t.ok(error.stack?.startsWith(`AssertionError: ${message}`),
		'expected to have a correct stack message');
});

await test('PrimitiveError', async (t) => {
	let toStringCalled = false;

	const object: unknown = {
		toString () {
			toStringCalled = true;
			return message;
		},
	};

	const error = new errors.PrimitiveError(object);

	t.equal(error.name, 'PrimitiveError',
		'expected to have a correct name');

	t.ok(toStringCalled,
		'expected to convert the value to string');

	t.equal(error.value, object,
		'expected to have a correct value');

	t.equal(error.message, message,
		'expected to have a correct message');

	t.ok(error.stack?.startsWith(`PrimitiveError: ${message}`),
		'expected to have a correct stack message');

	await t.test('static getError', async (t) => {
		const otherError = new Error(message);

		t.equal(errors.PrimitiveError.getError(otherError), otherError,
			'expected to return the input if error');

		const otherValue = message;
		const error = errors.PrimitiveError.getError(otherValue) as errors.PrimitiveError;

		t.ok(error instanceof errors.PrimitiveError,
			'expected to wrap the input if not error');

		t.equal(error.message, otherValue,
			'expected to have a correct message');

		t.equal(error.value, otherValue,
			'expected to have a correct value');
	});
});

await test('WrappedError', async (t) => {
	class NoStackError extends Error {
		name = 'NoStackError';
		stack = undefined;

		constructor () {
			super(message);
		}
	}

	const objects = [
		message,
		new NoStackError(),
		new errors.PrimitiveError(message),
		new Error(message),
	];

	for (const object of objects) {
		const originalError = errors.PrimitiveError.getError(object);
		const error = new errors.WrappedError(wrapperMessage, object);

		await t.test(`Value: ${String(object)}`, async (t) => {
			t.equal(error.name, 'WrappedError',
				'expected to have a correct name');

			t.equal(error.message, wrapperMessage,
				'expected to have a correct message');

			t.equal(error.thrownValue, object,
				'expected to have a store the original thrown value');

			t.ok(
				error.stack?.startsWith(`WrappedError: ${wrapperMessage}\n`
				+ `${originalError.name}: ${originalError.message}`),
				'expected to have a correct stack message',
			);
		});
	}
});
