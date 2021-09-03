import * as assert from '@esdmr/assert';

export function parseConfig (json: unknown) {
	try {
		assert.isObject(json);
		assert.isNotNull(json);
		assert.isString(json.name, 'property "name"');
		assert.isBoolean(json.private, 'property "private"');
	} catch (error) {
		throw assert.wrap(error, 'Failed to parse config');
	}

	return {
		name: json.name,
		private: json.private,
	}
}
