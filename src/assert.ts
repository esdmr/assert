import { AssertionError, WrappedError } from './errors.js';
import { DEFAULT_MESSAGE } from './messages.js';
import { format } from './utils.js';

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
	message = DEFAULT_MESSAGE,
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
	message = DEFAULT_MESSAGE,
	...args: unknown[]
) {
	return new WrappedError(format(message, ...args), thrownValue);
}
