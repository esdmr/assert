import * as messages from './messages.js';

/**
 * Asserts that the given value is not `null`.
 *
 * @public
 * @param value - Value to assert.
 */
export function isNotNull<T> (value: T | null): asserts value is T {
	if (value === null) {
		throw new TypeError(messages.IS_NULL);
	}
}

/**
 * Asserts that the given value is not `null` or `undefined`.
 *
 * @public
 * @param value - Value to assert.
 */
export function isNonNullable<T> (value: T | null | undefined): asserts value is T {
	if (value === null || value === undefined) {
		throw new TypeError(messages.IS_NULLABLE);
	}
}

/**
 * Asserts that the given value is not `undefined`.
 *
 * @public
 * @param value - Value to assert.
 */
export function isNotUndefined<T> (value: T | undefined): asserts value is T {
	if (value === undefined) {
		throw new TypeError(messages.IS_UNDEFINED);
	}
}
