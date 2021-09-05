import * as assert from '@esdmr/assert';

export function parseConfig (json: unknown) {
	try {
		assert.isObject(json);
		assert.isNotNull(json);
		assert.isBoolean(json.private, 'property "private"');
		assert.isEqual(json.private, false, 'property "private"');
		assert.isNumber(json.major, 'property "major"');
		assert.isGreater(json.major, 0, 'property "major"');
		assert.isNumber(json.minor, 'property "minor"');
		assert.isGreaterOrEqual(json.minor, 0, 'property "minor"');
	} catch (error) {
		throw assert.wrap(error, 'Failed to parse config');
	}

	return {
		major: json.major,
		minor: json.minor,
	};
}
