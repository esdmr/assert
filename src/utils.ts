/**
 * Formats strings for `assert` function.
 *
 * @internal
 * @param message - The message to include in the error. Formatted with `{}`.
 * @param args - Format arguments.
 * @returns The formatted string.
 */
export function format (message: string, ...args: unknown[]) {
	for (const item of args) {
		message = message.replace('{}', String(item));
	}

	return message;
}

/**
 * Provides more detail for a message.
 *
 * @internal
 * @param message - The message to include in the error.
 * @param detail - Extra description.
 * @returns Concatentated message.
 */
export function addDetail (message: string, detail?: string) {
	return typeof detail === 'string' ? `${message} (${detail})` : message;
}
