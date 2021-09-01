/**
 * Recreates the first line in the `error.stack`.
 *
 * @param error - The error to construct the message from.
 * @returns The resulting message.
 */
function getErrorMessage (error: Error) {
	return `${error.name}: ${error.message}`;
}

/**
 * Gets the trace part after the error message in `error.stack`.
 *
 * @param error - The error to get the trace from.
 * @returns Everything after the error message in the first line. It
 * intentionally starts with a newline.
 */
function getTracePart (error: Error) {
	const message = getErrorMessage(error);

	// Currently in all places which this function is called,
	// `Error.captureStackTrace` is also called.
	/* istanbul ignore next */
	const stack = error.stack ?? '';
	const index = stack.indexOf(message);

	// Theoretically, index should never be -1, but just in case.
	/* istanbul ignore if */
	if (index === -1) {
		return stack;
	}

	return stack.slice(index + message.length);
}

/**
 * The error which is thrown by the `assert` function.
 *
 * @public
 */
export class AssertionError extends Error {
	name = 'AssertionError';

	constructor (message: string) {
		super(message);
		Error.captureStackTrace(this, AssertionError);
	}
}

/**
 * Wrapper for any thrown value which is not an instance of Error. It converts
 * those values to string via `String`.
 *
 * @public
 */
export class PrimitiveError extends Error {
	name = 'PrimitiveError';
	stack = getErrorMessage(this);

	constructor (readonly value: unknown) {
		super(String(value));
	}

	/**
	 * Convert any value to an Error object if it is not already.
	 *
	 * @param value - The thrown value.
	 * @returns Either the thrown value or a new instance of
	 * {@link PrimitiveError}.
	 */
	static getError<T extends Error> (error: T): T;

	/**
	 * Convert any value to an Error object if it is not already.
	 *
	 * @param value - The thrown value.
	 * @returns Either the thrown value or a new instance of
	 * {@link PrimitiveError}.
	 */
	static getError (value: unknown): Error;

	static getError (value: unknown): Error {
		if (value instanceof Error) {
			return value;
		}

		return new PrimitiveError(value);
	}
}

/**
 * Wrapper for any thrown value. It provides extra context to errors and
 * assertions. Internally it uses {@link PrimitiveError} to wrap the original
 * thrown value.
 *
 * @public
 */
export class WrappedError extends Error {
	name = 'WrappedError';

	constructor (message: string, readonly thrownValue: unknown) {
		super(message);
		Error.captureStackTrace(this, WrappedError);

		const error = PrimitiveError.getError(thrownValue);
		const errorStack = error.stack;

		const finalStack = errorStack === undefined || error instanceof PrimitiveError
			? getErrorMessage(error) + getTracePart(this)
			: errorStack;

		this.stack = `${getErrorMessage(this)}\n${finalStack}`;
	}
}
