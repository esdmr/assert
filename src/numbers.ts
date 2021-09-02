import * as messages from './messages.js';
import { addDetail, format } from './utils.js';

/**
 * Asserts that the given value is not `NaN`.
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isNotNaN (value: number, detail?: string, ...args: unknown[]) {
	if (Number.isNaN(value)) {
		throw new RangeError(format(
			addDetail(messages.IS_NAN, detail),
			...args,
		));
	}
}

/**
 * Asserts that the given value is finite (Not `±Infinity` or `NaN`).
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isFinite (value: number, detail?: string, ...args: unknown[]) {
	if (!Number.isFinite(value)) {
		throw new RangeError(format(
			addDetail(messages.NOT_FINITE, detail),
			...args,
		));
	}
}

/**
 * Asserts that the given value is an integer. The integer may potentially be
 * not safe.
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isAnyInteger (value: number, detail?: string, ...args: unknown[]) {
	if (!Number.isInteger(value)) {
		throw new RangeError(format(
			addDetail(messages.NOT_INTEGER, detail),
			...args,
		));
	}
}

/**
 * Asserts that the given value is positive. Negative zero is considered positive.
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isPositive (value: number, detail?: string, ...args: unknown[]) {
	if (value < 0) {
		throw new RangeError(format(
			addDetail(messages.NOT_POSITIVE, detail),
			...args,
		));
	}
}

/**
 * Asserts that the given value is a safe integer.
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isSafeInteger (value: number, detail?: string, ...args: unknown[]) {
	if (!Number.isSafeInteger(value)) {
		throw new RangeError(format(
			addDetail(messages.NOT_SAFE_INTEGER, detail),
			...args,
		));
	}
}
