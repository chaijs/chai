# Bug: Incorrect showDiff default value handling in Assertion.assert()

## Description

The `showDiff` parameter handling in `Assertion.assert()` method has a logic bug that incorrectly converts non-`false` values (including `null`, `0`, empty strings, etc.) to `true` instead of only defaulting when the parameter is `undefined`.

## Location

**File:** `lib/chai/assertion.js`  
**Line:** 159  
**Method:** `Assertion.prototype.assert()`

## Current Behavior

```javascript
assert(_expr, msg, _negateMsg, expected, _actual, showDiff) {
  const ok = util.test(this, arguments);
  if (false !== showDiff) showDiff = true;  // ❌ Bug: converts null, 0, '', etc. to true
  if (undefined === expected && undefined === _actual) showDiff = false;
  if (true !== config.showDiff) showDiff = false;
  // ...
}
```

### Problem

The condition `if (false !== showDiff)` evaluates to `true` for any value that is not strictly equal to `false`, including:
- `null` → incorrectly converted to `true`
- `0` → incorrectly converted to `true`
- `''` (empty string) → incorrectly converted to `true`
- Any other falsy but non-`false` value → incorrectly converted to `true`

This means that if someone accidentally passes `null` or another falsy value (which shouldn't happen but could in edge cases), it will be treated as `true` instead of being handled appropriately.

## Expected Behavior

The `showDiff` parameter should only default to `true` when it is `undefined` (i.e., not provided). All other values should be preserved as-is, allowing the subsequent logic to handle them correctly.

## Proposed Fix

```javascript
assert(_expr, msg, _negateMsg, expected, _actual, showDiff) {
  const ok = util.test(this, arguments);
  if (showDiff === undefined) showDiff = true;  // ✅ Only default when undefined
  if (undefined === expected && undefined === _actual) showDiff = false;
  if (true !== config.showDiff) showDiff = false;
  // ...
}
```

## Impact

- **Low severity**: This is a minor logic issue that likely doesn't affect normal usage since the parameter is documented as optional boolean
- **Edge case**: Could cause unexpected behavior if non-boolean values are accidentally passed
- **Code quality**: The fix makes the intent clearer and more robust

## Testing

The existing tests in `test/assert.js` should continue to pass:
- `showDiff true with actual and expected args` - verifies default behavior
- `showDiff false without expected and actual` - verifies explicit `false` handling

## Type

- [x] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Performance improvement
- [ ] Code refactoring

## Additional Notes

This fix maintains backward compatibility since:
1. When `showDiff` is not provided (`undefined`), it still defaults to `true` ✓
2. When `showDiff` is explicitly `false`, it remains `false` ✓
3. When `showDiff` is explicitly `true`, it remains `true` ✓
4. The fix only changes behavior for edge cases (non-boolean values)

