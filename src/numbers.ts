import * as messages from './messages.js';

/**
 * Asserts that the given value is not `NaN`.
 *
 * @public
 * @param value - Value to assert.
 */
export function isNotNaN (value: number) {
	if (Number.isNaN(value)) {
		throw new RangeError(messages.IS_NAN);
	}
}

/**
 * Asserts that the given value is finite (Not `±Infinity` or `NaN`).
 *
 * @public
 * @param value - Value to assert.
 */
export function isFinite (value: number) {
	if (!Number.isFinite(value)) {
		throw new RangeError(messages.NOT_FINITE);
	}
}

/**
 * Asserts that the given value is an integer. The integer may potentially be
 * not safe.
 *
 * @public
 * @param value - Value to assert.
 */
export function isAnyInteger (value: number) {
	if (!Number.isInteger(value)) {
		throw new RangeError(messages.NOT_INTEGER);
	}
}

/**
 * Asserts that the given value is positive. Negative zero is considered positive.
 *
 * @public
 * @param value - Value to assert.
 */
export function isPositive (value: number) {
	if (value < 0) {
		throw new RangeError(messages.NOT_POSITIVE);
	}
}

/**
 * Asserts that the given value is a safe integer.
 *
 * @public
 * @param value - Value to assert.
 */
export function isSafeInteger (value: number) {
	if (!Number.isSafeInteger(value)) {
		throw new RangeError(messages.NOT_SAFE_INTEGER);
	}
}
