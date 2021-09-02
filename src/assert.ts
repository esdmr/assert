import { AssertionError, WrappedError } from './errors.js';
import { DEFAULT_MESSAGE } from './messages.js';

/**
 * Formats strings for `assert` function.
 *
 * @param message - The message to include in the error. Formatted with `{}`.
 * @param args - Format arguments.
 * @returns The formatted string.
 */
function format (message: string, ...args: unknown[]) {
	for (const item of args) {
		message = message.replace('{}', String(item));
	}

	return message;
}

/**
 * Asserts that a given condition is true. It formats the message provided with
 * the arguments after that which are stringified via `String`.
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
	if (condition) {
		return;
	}

	throw new AssertionError(format(message, ...args));
}

/**
 * Wraps any thrown value. It formats the message provided with the arguments
 * after that which are stringified via `String`.
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
