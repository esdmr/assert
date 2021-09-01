import * as messages from './messages.js';

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
 */
export function isBigInt (value: unknown): asserts value is bigint {
	if (typeof value !== 'bigint') {
		throw new TypeError(messages.NOT_BIGINT);
	}
}

/**
 * Asserts that the given value is a boolean.
 *
 * @public
 * @param value - Value to assert.
 */
export function isBoolean (value: unknown): asserts value is boolean {
	if (typeof value !== 'boolean') {
		throw new TypeError(messages.NOT_BOOLEAN);
	}
}

/**
 * Asserts that the given value is a function.
 *
 * @public
 * @param value - Value to assert.
 */
export function isFunction (value: unknown): asserts value is FunctionLike {
	if (typeof value !== 'function') {
		throw new TypeError(messages.NOT_FUNCTION);
	}
}

/**
 * Asserts that the given value is a number.
 *
 * @public
 * @param value - Value to assert.
 */
export function isNumber (value: unknown): asserts value is number {
	if (typeof value !== 'number') {
		throw new TypeError(messages.NOT_NUMBER);
	}
}

/**
 * Asserts that the given value is an object. The object may potentially be
 * `null`.
 *
 * @public
 * @param value - Value to assert.
 */
export function isObject (value: unknown): asserts value is ObjectLike | null {
	if (typeof value !== 'object') {
		throw new TypeError(messages.NOT_OBJECT);
	}
}

/**
 * Asserts that the given value is a string.
 *
 * @public
 * @param value - Value to assert.
 */
export function isString (value: unknown): asserts value is string {
	if (typeof value !== 'string') {
		throw new TypeError(messages.NOT_STRING);
	}
}

/**
 * Asserts that the given value is a symbol.
 *
 * @public
 * @param value - Value to assert.
 */
export function isSymbol (value: unknown): asserts value is symbol {
	if (typeof value !== 'symbol') {
		throw new TypeError(messages.NOT_SYMBOL);
	}
}
