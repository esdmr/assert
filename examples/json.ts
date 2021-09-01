import * as assert from '@esdmr/assert';

export function parseConfig (json: unknown) {
	try {
		assert.isObject(json);
		assert.isNotNull(json);
		assert.isString(json.name);
		assert.isBoolean(json.private);
	} catch (error) {
		throw new assert.WrappedError('Failed to parse config', error);
	}

	return {
		name: json.name,
		private: json.private,
	}
}
