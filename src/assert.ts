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
	message = messages.DEFAULT_MESSAGE,
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
	message = messages.DEFAULT_MESSAGE,
	...args: unknown[]
) {
	return new WrappedError(format(message, ...args), thrownValue);
}

export function isEqual<T> (
	value: T,
	expectedValue: T,
	detail?: string,
	...args: unknown[]
) {
	if (value !== expectedValue) {
		throw new AssertionError(format(
			addDetail(messages.NOT_EQUAL, detail),
			String(expectedValue),
			...args,
		));
	}
}

export function isNotEqual<T> (
	value: T,
	expectedValue: T,
	detail?: string,
	...args: unknown[]
) {
	if (value === expectedValue) {
		throw new AssertionError(format(
			addDetail(messages.IS_EQUAL, detail),
			String(expectedValue),
			...args,
		));
	}
}
