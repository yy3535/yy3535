# 自动化测试Jest

```js
npm install --save-dev jest
```

```js
// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

```js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

```js
// package.json
{
  "scripts": {
    "test": "jest"
  }
}
```

```js
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```