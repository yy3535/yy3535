# js单元测试的一门语言Jest

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

```js
// lesson1.test.js
import revertByWorld from '../../code/string/lesson1'

test('revertByWorld:Let\'s take LeetCode contest', () => {
  expect(revertByWorld("Let's take LeetCode contest")).toBe("s'teL ekat edoCteeL tsetnoc")
})
```