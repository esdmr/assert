import * as messages from './messages.js';
import { addDetail, format } from './utils.js';

/** @public */
export type FunctionLike =
	| ((...args: unknown[]) => unknown)
	| (new (...args: unknown[]) => unknown)
	| (abstract new (...args: unknown[]) => unknown);

/** @public */
export type ObjectLike = Record<string, unknown>;

/** @public */
export type TypedConstructor<T> =
	| (new (...args: unknown[]) => T)
	| (abstract new (...args: unknown[]) => T);

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
			addDetail(messages.notBigInt, detail),
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
			addDetail(messages.notBoolean, detail),
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
			addDetail(messages.notFunction, detail),
			...args,
		));
	}
}

/**
 * Asserts that the given value is an instance of a constructor.
 *
 * @public
 * @param value - Value to assert.
 * @param Constructor - The constructor to check value with.
 * @param detail - Extra description.
 * @param args - Format arguments.
 */
export function isInstanceOf<T> (
	value: unknown,
	Constructor: TypedConstructor<T>,
	detail?: string,
	...args: unknown[]
): asserts value is T {
	if (!(value instanceof Constructor)) {
		throw new TypeError(format(
			addDetail(messages.notInstanceOf, detail),
			Constructor.name,
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
			addDetail(messages.notNumber, detail),
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
			addDetail(messages.notObject, detail),
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
			addDetail(messages.notString, detail),
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
			addDetail(messages.notSymbol, detail),
			...args,
		));
	}
}
