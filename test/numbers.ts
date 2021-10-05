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
	positiveEpsilon: Number.EPSILON,
	negativeEpsilon: -Number.EPSILON,
	positiveInfinity: Number.POSITIVE_INFINITY,
	negativeInfinity: Number.NEGATIVE_INFINITY,
	maxSafeInteger: Number.MAX_SAFE_INTEGER,
	minSafeInteger: Number.MIN_SAFE_INTEGER,
	positiveMaxValue: Number.MAX_VALUE,
	negativeMaxValue: -Number.MAX_VALUE,
	positiveMinValue: Number.MIN_VALUE,
	negativeMinValue: -Number.MIN_VALUE,
	nan: Number.NaN,
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
	testFloat(t, numbers.isNotNaN, messages.isNaN, {
		nan: false,
	});

	await testDetail(t, (...args) => {
		numbers.isNotNaN(Number.NaN, ...args);
	}, RangeError, messages.isNaN);
});

await test('isFinite', async (t) => {
	testFloat(t, numbers.isFinite, messages.notFinite, {
		positiveInfinity: false,
		negativeInfinity: false,
		nan: false,
	});

	await testDetail(t, (...args) => {
		numbers.isFinite(Number.POSITIVE_INFINITY, ...args);
	}, RangeError, messages.notFinite);
});

await test('isAnyInteger', async (t) => {
	testFloat(t, numbers.isAnyInteger, messages.notInteger, {
		[-1.5]: false,
		[-0.5]: false,
		0.5: false,
		1.5: false,
		positiveEpsilon: false,
		negativeEpsilon: false,
		positiveInfinity: false,
		negativeInfinity: false,
		positiveMinValue: false,
		negativeMinValue: false,
		nan: false,
	});

	await testDetail(t, (...args) => {
		numbers.isAnyInteger(0.5, ...args);
	}, RangeError, messages.notInteger);
});

await test('isPositive', async (t) => {
	testFloat(t, numbers.isPositive, messages.notPositive, {
		[-1.5]: false,
		[-1]: false,
		[-0.5]: false,
		negativeEpsilon: false,
		negativeInfinity: false,
		minSafeInteger: false,
		negativeMaxValue: false,
		negativeMinValue: false,
	});

	await testDetail(t, (...args) => {
		numbers.isPositive(-1, ...args);
	}, RangeError, messages.notPositive);
});

await test('isSafeInteger', async (t) => {
	testFloat(t, numbers.isSafeInteger, messages.notSafeInteger, {
		[-1.5]: false,
		[-0.5]: false,
		0.5: false,
		1.5: false,
		positiveEpsilon: false,
		negativeEpsilon: false,
		positiveInfinity: false,
		negativeInfinity: false,
		positiveMaxValue: false,
		negativeMaxValue: false,
		positiveMinValue: false,
		negativeMinValue: false,
		nan: false,
	});

	await testDetail(t, (...args) => {
		numbers.isSafeInteger(0.5, ...args);
	}, RangeError, messages.notSafeInteger);
});

await test('isGreater', async (t) => {
	const message = format(messages.notGreater, 0);
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
	const message = format(messages.notGreaterOrEqual, 0);
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
	const message = format(messages.notLess, 0);
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
	const message = format(messages.notLessOrEqual, 0);
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
