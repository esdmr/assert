import { AssertionError, WrappedError } from './errors.js';
import * as messages from './messages.js';
import { addDetail, format } from './utils.js';

/**
 * Asserts that a given condition is true.
 *
 * @public
 * @param condition - The given condition.
 * @param message - The message to include in the error. Formatted with `{}`.
 * @param args - Format arguments.
 */
export function assert (
	condition: boolean,
	message = messages.defaultMessage,
	...args: unknown[]
): asserts condition {
	if (!condition) {
		throw new AssertionError(format(message, ...args));
	}
}

/**
 * Wraps any thrown value.
 *
 * @public
 * @param thrownValue - The value to wrap.
 * @param message - The message to include in the error. Formatted with `{}`.
 * @param args - Format arguments.
 */
export function wrap (
	thrownValue: unknown,
	message = messages.defaultMessage,
	...args: unknown[]
) {
	return new WrappedError(format(message, ...args), thrownValue);
}

/**
 * Asserts that the given value is strictly equal to the given expected value.
 *
 * @param value - Value to assert.
 * @param expectedValue
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isEqual<T> (
	value: T,
	expectedValue: T,
	detail?: string,
	...args: unknown[]
) {
	if (value !== expectedValue) {
		throw new AssertionError(format(
			addDetail(messages.notEqual, detail),
			expectedValue,
			...args,
		));
	}
}

/**
 * Asserts that the given value is not strictly equal to the given (un)expected value.
 *
 * @param value - Value to assert.
 * @param expectedValue
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isNotEqual<T> (
	value: T,
	expectedValue: T,
	detail?: string,
	...args: unknown[]
) {
	if (value === expectedValue) {
		throw new AssertionError(format(
			addDetail(messages.isEqual, detail),
			expectedValue,
			...args,
		));
	}
}
