# Changelog

## 1.1.0

### Minor Changes

- fac1734: Add equality operators: `isEqual`, `isNotEqual`.
- fac1734: Add inequality operators: `isGreater`, `isGreaterOrEqual`, `isLess`, `isLessOrEqual`.
- b61505e: New function `wrap` to format messages before creating a `WrappedError`.
- fac1734: New function `isInstanceOf`.
- b61505e: Allow assertions to be `detail`ed with contextual information. Additionally, this
  allows the full message to be formatted.

### Patch Changes

- b61505e: Fix `PrimitiveError` and `WrappedError` having enumerable properties, duplicating output.

## 1.0.1

### Patch Changes

- 637b316: Add missing exports in package.json

## 1.0.0

### Major Changes

- Initial release
