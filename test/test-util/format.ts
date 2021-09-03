import { addDetail } from '#src/utils.js';

export function testFormat (
	t: Tap.Test,
	func: (message: string, ...args: unknown[]) => void,
	newError: (message: string) => Error,
) {
	t.throws(
		() => {
			func('Custom message (arity 0)');
		},
		newError('Custom message (arity 0)'),
		'expected to format correctly with arity 0',
	);

	t.throws(
		() => {
			func('1{}3 (arity 1)', '(2)');
		},
		newError('1(2)3 (arity 1)'),
		'expected to format correctly with arity 1',
	);

	t.throws(
		() => {
			func('1{}3{}5 (arity 2)', '(2)', '(4)');
		},
		newError('1(2)3(4)5 (arity 2)'),
		'expected to format correctly with arity 2',
	);
}

export function testDetail (
	t: Tap.Test,
	func: (detail: string, ...args: unknown[]) => void,
	newError: (message: string) => Error,
	message: string,
) {
	testFormat(t, func, (detail: string) => newError(addDetail(message, detail)));
}
