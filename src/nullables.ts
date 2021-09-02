import * as messages from './messages.js';
import { addDetail, format } from './utils.js';

/**
 * Asserts that the given value is not `null`.
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isNotNull<T> (
	value: T | null,
	detail?: string,
	...args: unknown[]
): asserts value is T {
	if (value === null) {
		throw new TypeError(format(addDetail(messages.IS_NULL, detail), args));
	}
}

/**
 * Asserts that the given value is not `null` or `undefined`.
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isNonNullable<T> (
	value: T | null | undefined,
	detail?: string,
	...args: unknown[]
): asserts value is T {
	if (value === null || value === undefined) {
		throw new TypeError(format(addDetail(messages.IS_NULLABLE, detail), args));
	}
}

/**
 * Asserts that the given value is not `undefined`.
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isNotUndefined<T> (
	value: T | undefined,
	detail?: string,
	...args: unknown[]
): asserts value is T {
	if (value === undefined) {
		throw new TypeError(format(addDetail(messages.IS_UNDEFINED, detail), args));
	}
}
