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

/**
 * Asserts that the given value is greater than the given minimum value.
 *
 * @param value - Value to assert.
 * @param minimum
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isGreater (
	value: number,
	minimum: number,
	detail?: string,
	...args: unknown[]
) {
	if (value <= minimum) {
		throw new RangeError(format(
			addDetail(messages.NOT_GREATER, detail),
			minimum,
			...args,
		));
	}
}

/**
 * Asserts that the given value is greater than or equal to the given minimum
 * value.
 *
 * @param value - Value to assert.
 * @param minimum
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isGreaterOrEqual (
	value: number,
	minimum: number,
	detail?: string,
	...args: unknown[]
) {
	if (value < minimum) {
		throw new RangeError(format(
			addDetail(messages.NOT_GREATER_OR_EQUAL, detail),
			minimum,
			...args,
		));
	}
}

/**
 * Asserts that the given value is less than the given maximum value.
 *
 * @param value - Value to assert.
 * @param maximum
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isLess (
	value: number,
	maximum: number,
	detail?: string,
	...args: unknown[]
) {
	if (value >= maximum) {
		throw new RangeError(format(
			addDetail(messages.NOT_LESS, detail),
			maximum,
			...args,
		));
	}
}

/**
 * Asserts that the given value is less than or equal to the given maximum
 * value.
 *
 * @param value - Value to assert.
 * @param maximum
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isLessOrEqual (
	value: number,
	maximum: number,
	detail?: string,
	...args: unknown[]
) {
	if (value > maximum) {
		throw new RangeError(format(
			addDetail(messages.NOT_LESS_OR_EQUAL, detail),
			maximum,
			...args,
		));
	}
}
