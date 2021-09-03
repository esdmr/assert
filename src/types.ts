import * as messages from './messages.js';
import { addDetail, format } from './utils.js';

/** @public */
export type FunctionLike =
	| ((...args: unknown[]) => unknown)
	| (new (...args: unknown[]) => unknown)
	| (abstract new (...args: unknown[]) => unknown);

/** @public */
export type ObjectLike = Record<string, unknown>;

/**
 * Asserts that the given value is a big integer.
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isBigInt (
	value: unknown,
	detail?: string,
	...args: unknown[]
): asserts value is bigint {
	if (typeof value !== 'bigint') {
		throw new TypeError(format(
			addDetail(messages.NOT_BIGINT, detail),
			...args,
		));
	}
}

/**
 * Asserts that the given value is a boolean.
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isBoolean (
	value: unknown,
	detail?: string,
	...args: unknown[]
): asserts value is boolean {
	if (typeof value !== 'boolean') {
		throw new TypeError(format(
			addDetail(messages.NOT_BOOLEAN, detail),
			...args,
		));
	}
}

/**
 * Asserts that the given value is a function.
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isFunction (
	value: unknown,
	detail?: string,
	...args: unknown[]
): asserts value is FunctionLike {
	if (typeof value !== 'function') {
		throw new TypeError(format(
			addDetail(messages.NOT_FUNCTION, detail),
			...args,
		));
	}
}

/**
 * Asserts that the given value is a number.
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isNumber (
	value: unknown,
	detail?: string,
	...args: unknown[]
): asserts value is number {
	if (typeof value !== 'number') {
		throw new TypeError(format(
			addDetail(messages.NOT_NUMBER, detail),
			...args,
		));
	}
}

/**
 * Asserts that the given value is an object. The object may potentially be
 * `null`.
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isObject (
	value: unknown,
	detail?: string,
	...args: unknown[]
): asserts value is ObjectLike | null {
	if (typeof value !== 'object') {
		throw new TypeError(format(
			addDetail(messages.NOT_OBJECT, detail),
			...args,
		));
	}
}

/**
 * Asserts that the given value is a string.
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isString (
	value: unknown,
	detail?: string,
	...args: unknown[]
): asserts value is string {
	if (typeof value !== 'string') {
		throw new TypeError(format(
			addDetail(messages.NOT_STRING, detail),
			...args,
		));
	}
}

/**
 * Asserts that the given value is a symbol.
 *
 * @public
 * @param value - Value to assert.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isSymbol (
	value: unknown,
	detail?: string,
	...args: unknown[]
): asserts value is symbol {
	if (typeof value !== 'symbol') {
		throw new TypeError(format(
			addDetail(messages.NOT_SYMBOL, detail),
			...args,
		));
	}
}
