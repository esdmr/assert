import { test } from 'tap';
import { testDetail } from '#test/test-util/format.js';
import * as numbers from '#src/numbers.js';
import * as messages from '#src/messages.js';
import { format } from '#src/utils.js';

const floatValues = {
	[-1.5]: -1.5,
	[-1]: -1,
	[-0.5]: -0.5,
	0: 0,
	0.5: 0.5,
	1: 1,
	1.5: 1.5,
	POSITIVE_EPSILON: Number.EPSILON,
	NEGATIVE_EPSILON: -Number.EPSILON,
	POSITIVE_INFINITY: Number.POSITIVE_INFINITY,
	NEGATIVE_INFINITY: Number.NEGATIVE_INFINITY,
	MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
	MIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
	POSITIVE_MAX_VALUE: Number.MAX_VALUE,
	NEGATIVE_MAX_VALUE: -Number.MAX_VALUE,
	POSITIVE_MIN_VALUE: Number.MIN_VALUE,
	NEGATIVE_MIN_VALUE: -Number.MIN_VALUE,
	NaN: Number.NaN,
} as const;

type FloatValues = keyof typeof floatValues;
type FloatEntries = Array<[FloatValues, number]>;

function testFloat (
	t: Tap.Test,
	func: (value: number) => void,
	message: string,
	cases: { [K in FloatValues]?: boolean },
) {
	for (const [key, value] of Object.entries(floatValues) as FloatEntries) {
		if (key in cases ? cases[key] : true) {
			t.doesNotThrow(
				() => {
					func(value);
				},
				`expected to not throw an error for the value: ${key}`,
			);
		} else {
			t.throws(
				() => {
					func(value);
				},
				new RangeError(message),
				`expected to throw an error for the value: ${key}`,
			);
		}
	}
}

await test('isNotNaN', async (t) => {
	testFloat(t, numbers.isNotNaN, messages.IS_NAN, {
		NaN: false,
	});

	await testDetail(t, (...args) => {
		numbers.isNotNaN(Number.NaN, ...args);
	}, RangeError, messages.IS_NAN);
});

await test('isFinite', async (t) => {
	testFloat(t, numbers.isFinite, messages.NOT_FINITE, {
		POSITIVE_INFINITY: false,
		NEGATIVE_INFINITY: false,
		NaN: false,
	});

	await testDetail(t, (...args) => {
		numbers.isFinite(Number.POSITIVE_INFINITY, ...args);
	}, RangeError, messages.NOT_FINITE);
});

await test('isAnyInteger', async (t) => {
	testFloat(t, numbers.isAnyInteger, messages.NOT_INTEGER, {
		[-1.5]: false,
		[-0.5]: false,
		0.5: false,
		1.5: false,
		POSITIVE_EPSILON: false,
		NEGATIVE_EPSILON: false,
		POSITIVE_INFINITY: false,
		NEGATIVE_INFINITY: false,
		POSITIVE_MIN_VALUE: false,
		NEGATIVE_MIN_VALUE: false,
		NaN: false,
	});

	await testDetail(t, (...args) => {
		numbers.isAnyInteger(0.5, ...args);
	}, RangeError, messages.NOT_INTEGER);
});

await test('isPositive', async (t) => {
	testFloat(t, numbers.isPositive, messages.NOT_POSITIVE, {
		[-1.5]: false,
		[-1]: false,
		[-0.5]: false,
		NEGATIVE_EPSILON: false,
		NEGATIVE_INFINITY: false,
		MIN_SAFE_INTEGER: false,
		NEGATIVE_MAX_VALUE: false,
		NEGATIVE_MIN_VALUE: false,
	});

	await testDetail(t, (...args) => {
		numbers.isPositive(-1, ...args);
	}, RangeError, messages.NOT_POSITIVE);
});

await test('isSafeInteger', async (t) => {
	testFloat(t, numbers.isSafeInteger, messages.NOT_SAFE_INTEGER, {
		[-1.5]: false,
		[-0.5]: false,
		0.5: false,
		1.5: false,
		POSITIVE_EPSILON: false,
		NEGATIVE_EPSILON: false,
		POSITIVE_INFINITY: false,
		NEGATIVE_INFINITY: false,
		POSITIVE_MAX_VALUE: false,
		NEGATIVE_MAX_VALUE: false,
		POSITIVE_MIN_VALUE: false,
		NEGATIVE_MIN_VALUE: false,
		NaN: false,
	});

	await testDetail(t, (...args) => {
		numbers.isSafeInteger(0.5, ...args);
	}, RangeError, messages.NOT_SAFE_INTEGER);
});

await test('isGreater', async (t) => {
	const message = format(messages.NOT_GREATER, 0);
	const error = new RangeError(message);

	t.doesNotThrow(
		() => {
			numbers.isGreater(1, 0);
		},
		'expected not to throw for larger values',
	);

	t.throws(
		() => {
			numbers.isGreater(0, 0);
		},
		error,
		'expected to throw for equal values',
	);

	t.throws(
		() => {
			numbers.isGreater(-1, 0);
		},
		error,
		'expected to throw for smaller values',
	);

	await testDetail(t, (...args) => {
		numbers.isGreater(-1, 0, ...args);
	}, (message: string) => new RangeError(message), message);
});

await test('isGreaterOrEqual', async (t) => {
	const message = format(messages.NOT_GREATER_OR_EQUAL, 0);
	const error = new RangeError(message);

	t.doesNotThrow(
		() => {
			numbers.isGreaterOrEqual(1, 0);
		},
		'expected not to throw for larger values',
	);

	t.doesNotThrow(
		() => {
			numbers.isGreaterOrEqual(0, 0);
		},
		'expected not to throw for equal values',
	);

	t.throws(
		() => {
			numbers.isGreaterOrEqual(-1, 0);
		},
		error,
		'expected to throw for smaller values',
	);

	await testDetail(t, (...args) => {
		numbers.isGreaterOrEqual(-1, 0, ...args);
	}, (message: string) => new RangeError(message), message);
});

await test('isLess', async (t) => {
	const message = format(messages.NOT_LESS, 0);
	const error = new RangeError(message);

	t.throws(
		() => {
			numbers.isLess(1, 0);
		},
		error,
		'expected not to throw for larger values',
	);

	t.throws(
		() => {
			numbers.isLess(0, 0);
		},
		error,
		'expected to throw for equal values',
	);

	t.doesNotThrow(
		() => {
			numbers.isLess(-1, 0);
		},
		'expected to throw for smaller values',
	);

	await testDetail(t, (...args) => {
		numbers.isLess(1, 0, ...args);
	}, (message: string) => new RangeError(message), message);
});

await test('isLessOrEqual', async (t) => {
	const message = format(messages.NOT_LESS_OR_EQUAL, 0);
	const error = new RangeError(message);

	t.throws(
		() => {
			numbers.isLessOrEqual(1, 0);
		},
		error,
		'expected not to throw for larger values',
	);

	t.doesNotThrow(
		() => {
			numbers.isLessOrEqual(0, 0);
		},
		'expected to throw for equal values',
	);

	t.doesNotThrow(
		() => {
			numbers.isLessOrEqual(-1, 0);
		},
		'expected to throw for smaller values',
	);

	await testDetail(t, (...args) => {
		numbers.isLessOrEqual(1, 0, ...args);
	}, (message: string) => new RangeError(message), message);
});
