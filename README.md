[![CircleCI](https://img.shields.io/circleci/project/github/selfrefactor/rambda.svg)](https://circleci.com/gh/selfrefactor/rambda)
[![codecov](https://codecov.io/gh/selfrefactor/rambda/branch/master/graph/badge.svg)](https://codecov.io/gh/selfrefactor/rambda)
[![dependencies Status](https://david-dm.org/selfrefactor/rambda/status.svg)](https://david-dm.org/selfrefactor/rambda)

# Rambda

Faster alternative to **Ramda** in just 10kB - [Documentation](https://selfrefactor.github.io/rambda/#/)

## Rambda's advantages

- Tree-shaking

Currenly **Rambda** is more tree-shakable than **Ramda** as you can see in this [tree-shaking example](https://github.com/selfrefactor/tree-shaking-example).

- Speed

**Rambda** is generally more performant than `Ramda` as the benchmarks can prove that.

You can clone this repo and run `yarn run benchmark all` to see for yourself.

- dot notation for `R.path` 

Standard usage of `R.path` is `R.path(['a', 'b'], {a: {b: 1} })```.

In **Rambda** you have the choice to use the more readable dot notation: 

```R.path('a.b', {a: {b: 1} })``` 

- comma notation for `R.pick` and `R.omit` 

Similar to dot notation, but the separator is comma(`,`) instead of dot(`.`).

```R.pick('a,b', {a: 1 , b: 2, c: 3} })``` 

- Typescript included

Typescript definitions are included in the library, in comparison to **Ramda**, where you need to additionally install `@types/ramda`.

---

**Rambda** partially shadows **Ramda**'s API, which means that you need to check **Rambda**'s documentation to assure that all the methods you need are available.

## Example use

```
const R = require('rambda')
const result = R.compose(
  R.filter( R.equals( 2 ) ),
  R.map( R.add( 1 ) )
)({ a: 1, b: 2, c: 3 })
console.log(result) // => '{a: 2}'
```

## Install

- Use **yarn add rambda** for `Webpack` and `Node.js` usage

- For UMD usage either use `./dist/rambda.umd.js` or the CDN link at

```
https://cdnjs.cloudflare.com/ajax/libs/rambda/1.0.8/webVersion.js
```

## Differences between Rambda and Ramda

- Rambda's **type** detect async functions and unresolved `Promises`. The returned values are `'Async'` and `'Promise'`.

- Rambda's **equals** doesn't protect against circular structures as **Ramda.equals** does.

- Rambda's **map** and **filter** pass object key as second argument when mapping over objects.

- Rambda's **path** accepts dot notation, i.e. `'x.y' same as ['x','y']`

- Rambda's **pick** and **omit** accept comma notation, i.e. `'x,y' same as ['x','y']`

- Rambda's **flip** works only for functions expecting two arguments.

- Rambda's **partialCurry** and **includes** are not part of Ramda API.

- Rambda's **startsWith/endsWith** work only with strings, instead with array and strings.

> If you need more **Ramda** methods in **Rambda**, you may either submit a `PR` or check the extended version of **Rambda** - [Rambdax](https://github.com/selfrefactor/rambdax)

## API

---
#### add

> add(a: Number, b: Number): Number

```
R.add(2, 3) // =>  5
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/add.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.add(2%2C%203)%20%2F%2F%20%3D%3E%20%205)

---
#### addIndex

> addIndex(fn: Function): Function

```
const mapWithIndex = R.addIndex(R.map)
const result = mapWithIndex(
  (val, index) => `${val} - ${index}`,
  ['A', 'B', 'C']
) // => ['A - 0', 'B - 1', 'C - 2']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/addIndex.js)

[Try in REPL](https://rambda.now.sh?const%20mapWithIndex%20%3D%20R.addIndex(R.map)%0Aconst%20result%20%3D%20mapWithIndex(%0A%20%20(val%2C%20index)%20%3D%3E%20%60%24%7Bval%7D%20-%20%24%7Bindex%7D%60%2C%0A%20%20%5B'A'%2C%20'B'%2C%20'C'%5D%0A)%20%2F%2F%20%3D%3E%20%5B'A%20-%200'%2C%20'B%20-%201'%2C%20'C%20-%202'%5D)

---
#### adjust

> adjust(replaceFn: Function, i:Number, arr:Array): Array

It replaces `i` index in `arr` with the result of `replaceFn(arr[i])`.

```
R.adjust(
  a => a + 1,
  0, 
  [0, 100]
) // => [1, 100]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/adjust.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.adjust(%0A%20%20a%20%3D%3E%20a%20%2B%201%2C%0A%20%200%2C%20%0A%20%20%5B0%2C%20100%5D%0A)%20%2F%2F%20%3D%3E%20%5B1%2C%20100%5D)

---
#### all

> all(fn: Function, arr: Array): Boolean

It returns `true` if all members of array `arr` returns `true`, when applied as argument to function `fn`.

```
const arr = [ 0, 1, 2, 3, 4 ]
const fn = x => x > -1
const result = R.all(fn, arr) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/all.js)

[Try in REPL](https://rambda.now.sh?const%20arr%20%3D%20%5B%200%2C%201%2C%202%2C%203%2C%204%20%5D%0Aconst%20fn%20%3D%20x%20%3D%3E%20x%20%3E%20-1%0Aconst%20result%20%3D%20R.all(fn%2C%20arr)%20%2F%2F%20%3D%3E%20true)

---
#### allPass

> allPass(rules: Array<Function>, input: any): Boolean

It returns `true` if all functions of `rules` return `true`, when `input` is their argument.

```
const input = {
  a : 1,
  b : 2,
}
const rules = [
  x => x.a === 1,
  x => x.b === 2,
]
const result = R.allPass(rules, obj) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/allPass.js)

[Try in REPL](https://rambda.now.sh?const%20input%20%3D%20%7B%0A%20%20a%20%3A%201%2C%0A%20%20b%20%3A%202%2C%0A%7D%0Aconst%20rules%20%3D%20%5B%0A%20%20x%20%3D%3E%20x.a%20%3D%3D%3D%201%2C%0A%20%20x%20%3D%3E%20x.b%20%3D%3D%3D%202%2C%0A%5D%0Aconst%20result%20%3D%20R.allPass(rules%2C%20obj)%20%2F%2F%20%3D%3E%20true)

---
#### always

> always(x: any): Function

It returns function that always returns `x`.
```
const returnSeven = R.always(7)

console.log(returnSeven)// => 7
console.log(returnSeven)// => 7
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/always.js)

[Try in REPL](https://rambda.now.sh?const%20returnSeven%20%3D%20R.always(7)%0A%0Aconsole.log(returnSeven)%2F%2F%20%3D%3E%207%0Aconsole.log(returnSeven)%2F%2F%20%3D%3E%207)

---
#### any

> any(condition: Function, arr: Array): Boolean

It returns true if at least one member of `arr` returns true,
when passed to the `condition` function.

```
R.any(a => a * a > 8)([1, 2, 3]) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/any.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.any(a%20%3D%3E%20a%20*%20a%20%3E%208)(%5B1%2C%202%2C%203%5D)%20%2F%2F%20%3D%3E%20true)

---
#### append

> append(valueToAppend: any, arr: Array): Array

```
R.append(
  'foo', 
  ['bar', 'baz']
) // => ['bar', 'baz', 'foo']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/append.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.append(%0A%20%20'foo'%2C%20%0A%20%20%5B'bar'%2C%20'baz'%5D%0A)%20%2F%2F%20%3D%3E%20%5B'bar'%2C%20'baz'%2C%20'foo'%5D)

---
#### both

> both(x: Function, y: Function, input: any): Boolean

It returns `true` if both function `x` and function `y` return `true`, when `input` is their argument.

```
const fn = R.both(
  a => a > 10,
  a => a < 20
)
console.log(fn(15)) //=> true
console.log(fn(30)) //=> false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/both.js)

[Try in REPL](https://rambda.now.sh?const%20fn%20%3D%20R.both(%0A%20%20a%20%3D%3E%20a%20%3E%2010%2C%0A%20%20a%20%3D%3E%20a%20%3C%2020%0A)%0Aconsole.log(fn(15))%20%2F%2F%3D%3E%20true%0Aconsole.log(fn(30))%20%2F%2F%3D%3E%20false)

---
#### compose

> compose(fn1: Function, ... , fnN: Function): any

It performs right-to-left function composition.
```
const result = R.compose(
  R.map(x => x * 2)
  R.filter(x => x > 2),
)([1, 2, 3, 4])  // => [6, 8]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/compose.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.compose(%0A%20%20R.map(x%20%3D%3E%20x%20*%202)%0A%20%20R.filter(x%20%3D%3E%20x%20%3E%202)%2C%0A)(%5B1%2C%202%2C%203%2C%204%5D)%20%20%2F%2F%20%3D%3E%20%5B6%2C%208%5D)

---
#### complement

> complement(fn: Function): Function

It returns `complemented` function that accept `input` as argument.

The return value of `complemented` is the negative boolean value of `fn(input)`.

```
R.complement(R.always(true)) // => false
R.complement(R.always(false)) // => true
```
[Source](https://github.com/selfrefactor/rambda/tree/master/modules/complement.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.complement(R.always(true))%20%2F%2F%20%3D%3E%20false%0AR.complement(R.always(false))%20%2F%2F%20%3D%3E%20true)

---
#### concat

> concat(x: array|string, y: array|string): array|string

It returns a new string or array, which is the result of merging `x` and `y`.

```
R.concat([1, 2])([3, 4]) // => [1, 2, 3, 4]
R.concat('foo')('bar') // => 'foobar'
```

---
#### contains

> contains(valueToFind: any, arr: Array): Boolean

It returns true if `valueToFind` is part of `arr`.

```
R.contains(2, [1, 2]) // => true
R.contains(3, [1, 2]) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/contains.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.contains(2%2C%20%5B1%2C%202%5D)%20%2F%2F%20%3D%3E%20true%0AR.contains(3%2C%20%5B1%2C%202%5D)%20%2F%2F%20%3D%3E%20false)

---
#### curry

> curry(fn: Function): Function

It returns curried version of `fn`.

```
const addFourNumbers = (a, b, c, d) => a + b + c + d
const curriedAddFourNumbers = R.curry(addFourNumbers)
const f = curriedAddFourNumbers(1, 2)
const g = f(3)
const result = g(4) // => 10
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/curry.js)

[Try in REPL](https://rambda.now.sh?const%20addFourNumbers%20%3D%20(a%2C%20b%2C%20c%2C%20d)%20%3D%3E%20a%20%2B%20b%20%2B%20c%20%2B%20d%0Aconst%20curriedAddFourNumbers%20%3D%20R.curry(addFourNumbers)%0Aconst%20f%20%3D%20curriedAddFourNumbers(1%2C%202)%0Aconst%20g%20%3D%20f(3)%0Aconst%20result%20%3D%20g(4)%20%2F%2F%20%3D%3E%2010)

---
#### dec

> dec(x: number): number

It decrements a number.
```
R.dec(2) // => 1
```

---
#### defaultTo

> defaultTo(defaultValue: T, inputArgument: any): T

It returns `defaultValue`, if `inputArgument` is `undefined`, `null` or `NaN`.

It returns `inputArgument` in any other case.

```
console.log(R.defaultTo('foo', undefined)) // => 'foo'
console.log(R.defaultTo('foo', 'bar')) // => 'bar'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/defaultTo.js)

[Try in REPL](https://rambda.now.sh?console.log(R.defaultTo('foo'%2C%20undefined))%20%2F%2F%20%3D%3E%20'foo'%0Aconsole.log(R.defaultTo('foo'%2C%20'bar'))%20%2F%2F%20%3D%3E%20'bar')

---
#### divide

```
R.divide(71, 100) // => 0.71
```

---
#### drop

> drop(howManyToDrop: Number, arrOrStr: Array|String): Array|String

It returns `arrOrStr` with `howManyToDrop` items dropped from the left.

```
R.drop(1, ['foo', 'bar', 'baz']) // => ['bar', 'baz']
R.drop(1, 'foo')  // => 'oo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/drop.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.drop(1%2C%20%5B'foo'%2C%20'bar'%2C%20'baz'%5D)%20%2F%2F%20%3D%3E%20%5B'bar'%2C%20'baz'%5D%0AR.drop(1%2C%20'foo')%20%20%2F%2F%20%3D%3E%20'oo')

---
#### dropLast

> dropLast(howManyToDrop: Number, arrOrStr: Array|String): Array|String

It returns `arrOrStr` with `howManyToDrop` items dropped from the right.

```
R.dropLast(1, ['foo', 'bar', 'baz']) // => ['foo', 'bar']
R.dropLast(1, 'foo')  // => 'fo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/dropLast.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.dropLast(1%2C%20%5B'foo'%2C%20'bar'%2C%20'baz'%5D)%20%2F%2F%20%3D%3E%20%5B'foo'%2C%20'bar'%5D%0AR.dropLast(1%2C%20'foo')%20%20%2F%2F%20%3D%3E%20'fo')

---
#### endsWith

> endsWith(x: String, str: String): Boolean

```
R.endsWith(
  'bar',
  'foo-bar'
) // => true

R.endsWith(
  'foo',
  "foo-bar"
) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/endsWith.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.endsWith(%0A%20%20'bar'%2C%0A%20%20'foo-bar'%0A)%20%2F%2F%20%3D%3E%20true%0A%0AR.endsWith(%0A%20%20'foo'%2C%0A%20%20%22foo-bar%22%0A)%20%2F%2F%20%3D%3E%20false)

---
#### either

```
const fn = R.either(
  a => a > 10,
  a => a % 2 === 0
)
fn(15) //=> true
fn(6) //=> true
fn(7) //=> false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/either.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20const%20fn%20%3D%20R.either(%0A%20%20a%20%3D%3E%20a%20%3E%2010%2C%0A%20%20a%20%3D%3E%20a%20%25%202%20%3D%3D%3D%200%0A)%0Afn(15)%20%2F%2F%3D%3E%20true%0Afn(6)%20%2F%2F%3D%3E%20true%0Afn(7)%20%2F%2F%3D%3E%20false)

---
#### equals

> equals(a: any, b: any): Boolean

It returns equality match between `a` and `b`.

It doesn't handle cyclical data structures.

```
R.equals(1, 1) // => true
R.equals({}, {}) // => false
R.equals([1, 2, 3], [1, 2, 3]) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/equals.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.equals(1%2C%201)%20%2F%2F%20%3D%3E%20true%0AR.equals(%7B%7D%2C%20%7B%7D)%20%2F%2F%20%3D%3E%20false%0AR.equals(%5B1%2C%202%2C%203%5D%2C%20%5B1%2C%202%2C%203%5D)%20%2F%2F%20%3D%3E%20true)

---
#### F

`R.F() // => false`

---
#### filter

> filter(filterFn: Function, x: Array|Object): Array|Object

It filters `x` iterable over boolean returning `filterFn`.

```
const filterFn = a => a % 2 === 0

R.filter(filterFn, [1, 2, 3, 4]) // => [2, 4]
```

The method works with objects as well. 

Note that unlike Ramda's `filter`, here object keys are passed as second argument to `filterFn`.

```
const result = R.filter((val, prop)=>{
  return prop === 'a' || val === 2  
}, {a: 1, b: 2, c: 3}) 
console.log(result) // => {a: 1, b: 2}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/filter.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20const%20filterFn%20%3D%20a%20%3D%3E%20a%20%25%202%20%3D%3D%3D%200%0A%0AR.filter(filterFn%2C%20%5B1%2C%202%2C%203%2C%204%5D)%20%2F%2F%20%3D%3E%20%5B2%2C%204%5D)

---
#### find

> find(findFn: Function, arr: Array<T>): T|undefined

It returns `undefined` or the first element of `arr` satisfying `findFn`.

```
const findFn = a => R.type(a.foo) === "Number"
const arr = [{foo: "bar"}, {foo: 1}]
R.find(findFn, arr) // => {foo: 1}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/find.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20const%20findFn%20%3D%20a%20%3D%3E%20R.type(a.foo)%20%3D%3D%3D%20%22Number%22%0Aconst%20arr%20%3D%20%5B%7Bfoo%3A%20%22bar%22%7D%2C%20%7Bfoo%3A%201%7D%5D%0AR.find(findFn%2C%20arr)%20%2F%2F%20%3D%3E%20%7Bfoo%3A%201%7D)

---
#### findIndex

> findIndex(findFn: Function, arr: Array): Number

It returns `-1` or the index of the first element of `arr` satisfying `findFn`.

```
const findFn = a => R.type(a.foo) === "Number"
const arr = [{foo: "bar"}, {foo: 1}]
R.find(findFn, arr) // => 1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/findIndex.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20const%20findFn%20%3D%20a%20%3D%3E%20R.type(a.foo)%20%3D%3D%3D%20%22Number%22%0Aconst%20arr%20%3D%20%5B%7Bfoo%3A%20%22bar%22%7D%2C%20%7Bfoo%3A%201%7D%5D%0AR.find(findFn%2C%20arr)%20%2F%2F%20%3D%3E%201)

---
#### flatten

> flatten(arr: Array): Array

```
R.flatten([ 1, [ 2, [ 3 ] ] ])
// => [ 1, 2, 3 ]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/flatten.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.flatten(%5B%201%2C%20%5B%202%2C%20%5B%203%20%5D%20%5D%20%5D)%0A%2F%2F%20%3D%3E%20%5B%201%2C%202%2C%203%20%5D)

---
#### flip

> flip(fn: Function): Function

It returns function which calls `fn` with exchanged first and second argument.

```
const subtractFlip = R.flip(R.subtract)
R.subtractFlip(1,7)
// => 6
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/flip.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20const%20subtractFlip%20%3D%20R.flip(R.subtract)%0AR.subtractFlip(1%2C7)%0A%2F%2F%20%3D%3E%206)

---
#### forEach

> forEach(fn: Function, arr: Array): Array

It applies function `fn` over all members of array `arr` and returns `arr`.

```
const sideEffect = {}
const result = R.forEach(
  x => sideEffect[`foo${x}`] = x
)([1, 2])

console.log(sideEffect) //=> {foo1 : 1, foo2 : 2}
console.log(result) //=> [1, 2]
```

Note, that unlike `Ramda`'s **forEach**, Rambda's one doesn't dispatch to `forEach` method of `arr` if `arr` has such method.

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/forEach.js)

[Try in REPL](https://rambda.now.sh?const%20sideEffect%20%3D%20%7B%7D%0Aconst%20result%20%3D%20R.forEach(%0A%20%20x%20%3D%3E%20sideEffect%5B%60foo%24%7Bx%7D%60%5D%20%3D%20x%0A)(%5B1%2C%202%5D)%0A%0Aconsole.log(sideEffect)%20%2F%2F%3D%3E%20%7Bfoo1%20%3A%201%2C%20foo2%20%3A%202%7D%0Aconsole.log(result)%20%2F%2F%3D%3E%20%5B1%2C%202%5D)

---
#### has

> has(prop: String, obj: Object): Boolean

- It returns `true` if `obj` has property `prop`.

```
R.has("a", {a: 1}) // => true
R.has("b", {a: 1}) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/has.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.has(%22a%22%2C%20%7Ba%3A%201%7D)%20%2F%2F%20%3D%3E%20true%0AR.has(%22b%22%2C%20%7Ba%3A%201%7D)%20%2F%2F%20%3D%3E%20false)

---
#### head

> head(arrOrStr: Array|String): any

It returns the first element of `arrOrStr`.

```
R.head([1, 2, 3]) // => 1
R.head('foo') // => 'f'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/head.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.head(%5B1%2C%202%2C%203%5D)%20%2F%2F%20%3D%3E%201%0AR.head('foo')%20%2F%2F%20%3D%3E%20'f')

---
#### identity

> identity(x: T): T

It just passes back the supplied arguments.
```
R.identity(7) // => 7
```

---
#### ifElse

> ifElse(condition: Function|boolean, ifFn: Function, elseFn: Function): Function

It returns function, which expect `input` as argument and returns `finalResult`.

When this function is called, a value `answer` is generated as a result of `condition(input)`.

If `answer` is `true`, then `finalResult` is equal to `ifFn(input)`.
If `answer` is `false`, then `finalResult` is equal to `elseFn(input)`.

```
const fn = R.ifElse(
 x => x > 10,
 x => x*2,
 x => x*10
)
fn(8) // => 80
fn(11) // => 22
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/ifElse.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20const%20fn%20%3D%20R.ifElse(%0A%20x%20%3D%3E%20x%20%3E%2010%2C%0A%20x%20%3D%3E%20x*2%2C%0A%20x%20%3D%3E%20x*10%0A)%0Afn(8)%20%2F%2F%20%3D%3E%2080%0Afn(11)%20%2F%2F%20%3D%3E%2022)

---
#### inc

> inc(x: number): number


It increments a number.
```
R.inc(1) // => 2
```

---
#### includes

> includes(x: any, arrOrStr: Array|String): Boolean

```
R.includes(1, [1, 2]) // => true
R.includes('oo', 'foo') // => true
R.includes('z', 'foo') // => false
```

!! Note that this method is not part of `Ramda` API.

---
#### indexOf

> indexOf(valueToFind: any, arr: Array): Number

It returns `-1` or the index of the first element of `arr` equal of `valueToFind`.

```
R.indexOf(1, [1, 2]) // => 0
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/indexOf.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.indexOf(1%2C%20%5B1%2C%202%5D)%20%2F%2F%20%3D%3E%200)

---
#### init

> init(arrOrStr: Array|String): Array|String

- It returns all but the last element of `arrOrStr`.

```
R.init([1, 2, 3])  // => [1, 2]
R.init('foo')  // => 'fo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/init.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.init(%5B1%2C%202%2C%203%5D)%20%20%2F%2F%20%3D%3E%20%5B1%2C%202%5D%0AR.init('foo')%20%20%2F%2F%20%3D%3E%20'fo')

---
#### join

> join(separator: String, arr: Array): String

```
R.join('-', [1, 2, 3])  // => '1-2-3'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/join.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.join('-'%2C%20%5B1%2C%202%2C%203%5D)%20%20%2F%2F%20%3D%3E%20'1-2-3')

---
#### is

> is(xPrototype: any, x: any): boolean

It returns `true` is `x` is instance of `xPrototype`.

```
R.is(String, 'foo')  // => true
R.is(Array, 1)  // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/is.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.is(String%2C%20'foo')%20%20%2F%2F%20%3D%3E%20true%0AR.is(Array%2C%201)%20%20%2F%2F%20%3D%3E%20false)

---
#### isNil

> isNil(x: any): Boolean

It returns `true` is `x` is either `null` or `undefined`.

```
R.isNil(null)  // => true
R.isNil(1)  // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/isNil.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.isNil(null)%20%20%2F%2F%20%3D%3E%20true%0AR.isNil(1)%20%20%2F%2F%20%3D%3E%20false)

---
#### last

> last(arrOrStr: Array|String): any

- It returns the last element of `arrOrStr`.

```
R.last(['foo', 'bar', 'baz']) // => 'baz'
R.last('foo') // => 'o'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/last.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.last(%5B'foo'%2C%20'bar'%2C%20'baz'%5D)%20%2F%2F%20%3D%3E%20'baz'%0AR.last('foo')%20%2F%2F%20%3D%3E%20'o')

---
#### lastIndexOf

> lastIndexOf(x: any, arr: Array): Number

It returns the last index of `x` in array `arr`.

`R.equals` is used to determine equality between `x` and members of `arr`.

Value `-1` is returned if no `x` is found in `arr`.

```
R.lastIndexOf(1, [1, 2, 3, 1, 2]) // => 3
R.lastIndexOf(10, [1, 2, 3, 1, 2]) // => -1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/lastIndexOf.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.lastIndexOf(1%2C%20%5B1%2C%202%2C%203%2C%201%2C%202%5D)%20%2F%2F%20%3D%3E%203%0AR.lastIndexOf(10%2C%20%5B1%2C%202%2C%203%2C%201%2C%202%5D)%20%2F%2F%20%3D%3E%20-1)

---
#### length

> length(arrOrStr: Array|String): Number

```
R.length([1, 2, 3]) // => 3
```

---
#### map

> map(mapFn: Function, x: Array|Object): Array|Object

It returns the result of looping through iterable `x` with `mapFn`.

```
const mapFn = x => x * 2;
R.map(mapFn, [1, 2, 3]) // => [2, 4, 6]
```

The method works with objects as well. 

Note that unlike Ramda's `map`, here object keys are passed as second argument to `mapFn`.

```
const result = R.map((val, prop)=>{
  return `${val}-${prop}`  
}, {a: 1, b: 2}) 
console.log(result) // => {a: 'a-1', b: 'b-2'}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/map.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20const%20mapFn%20%3D%20x%20%3D%3E%20x%20*%202%3B%0AR.map(mapFn%2C%20%5B1%2C%202%2C%203%5D)%20%2F%2F%20%3D%3E%20%5B2%2C%204%2C%206%5D)

---
#### match

> match(regExpression: Regex, str: String): Array

```
R.match(/([a-z]a)/g, 'bananas') // => ['ba', 'na', 'na']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/match.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.match(%2F(%5Ba-z%5Da)%2Fg%2C%20'bananas')%20%2F%2F%20%3D%3E%20%5B'ba'%2C%20'na'%2C%20'na'%5D)

---
#### merge

> merge(a: Object, b: Object)

It returns result of `Object.assign({}, a, b)`.

```
R.merge({ 'foo': 0, 'bar': 1 }, { 'foo': 7 })
// => { 'foo': 7, 'bar': 1 }
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/merge.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.merge(%7B%20'foo'%3A%200%2C%20'bar'%3A%201%20%7D%2C%20%7B%20'foo'%3A%207%20%7D)%0A%2F%2F%20%3D%3E%20%7B%20'foo'%3A%207%2C%20'bar'%3A%201%20%7D)

---
#### modulo

> modulo(a: Number, b: Number): Number

It returns the remainder of operation `a/b`.

```
R.module(14,3) // => 2
```

---
#### multiply

> multiply(a: Number, b: Number): Number

It returns the result of operation `a*b`.

```
R.module(14,3) // => 2
```

---
#### not

> not(x: any): Boolean

It returns inverted boolean version of input `x`.

```
R.not(true); //=> false
R.not(false); //=> true
R.not(0); //=> true
R.not(1); //=> false
```

---
#### omit

> omit(propsToOmit: Array<String>, obj: Object): Object

It returns a partial copy of an `obj` with omitting `propsToOmit`

```
R.omit(['a', 'd'], {a: 1, b: 2, c: 3}) // => {b: 2, c: 3}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/omit.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.omit(%5B'a'%2C%20'd'%5D%2C%20%7Ba%3A%201%2C%20b%3A%202%2C%20c%3A%203%7D)%20%2F%2F%20%3D%3E%20%7Bb%3A%202%2C%20c%3A%203%7D)

---
#### path

> path(pathToSearch: Array<String>|String, obj: Object): any

If `pathToSearch` is `'a.b'` then it will return `1` if `obj` is `{a:{b:1}}`.

It will return `undefined`, if such path is not found.

```
R.path('a.b', {a: {b: 1}}) // => 1
R.path(['a', 'b'], {a: {b: 2}}) // => 2
R.path(['a', 'c'], {a: {b: 2}}) // => undefined
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/path.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.path('a.b'%2C%20%7Ba%3A%20%7Bb%3A%201%7D%7D)%20%2F%2F%20%3D%3E%201%0AR.path(%5B'a'%2C%20'b'%5D%2C%20%7Ba%3A%20%7Bb%3A%202%7D%7D)%20%2F%2F%20%3D%3E%202%0AR.path(%5B'a'%2C%20'c'%5D%2C%20%7Ba%3A%20%7Bb%3A%202%7D%7D)%20%2F%2F%20%3D%3E%20undefined)

---
#### pathOr

> pathOr(defaultValue: any, pathToSearch: Array<String>|String, obj: Object): any

`pathFound` is the result of calling `R.path(pathToSearch, obj)`.

If `pathFound` is `undefined`, `null` or `NaN`, then `defaultValue` will be returned.

`pathFound` is returned in any other case.

```
R.pathOr(1, 'a.b', {a: {b: 2}}) // => 2
R.pathOr(1, ['a', 'b'], {a: {b: 2}}) // => 2
R.pathOr(1, ['a', 'c'], {a: {b: 2}}) // => 1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/pathOr.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.pathOr(1%2C%20'a.b'%2C%20%7Ba%3A%20%7Bb%3A%202%7D%7D)%20%2F%2F%20%3D%3E%202%0AR.pathOr(1%2C%20%5B'a'%2C%20'b'%5D%2C%20%7Ba%3A%20%7Bb%3A%202%7D%7D)%20%2F%2F%20%3D%3E%202%0AR.pathOr(1%2C%20%5B'a'%2C%20'c'%5D%2C%20%7Ba%3A%20%7Bb%3A%202%7D%7D)%20%2F%2F%20%3D%3E%201)

---
#### partialCurry

> partialCurry(fn: Function|Async, a: Object, b: Object): Function|Promise

When called with function `fn` and first set of input `a`, it will return a function.

This function will wait to be called with second set of input `b` and it will invoke `fn` with the merged object of `a` over `b`.

`fn` can be asynchronous function. In that case a `Promise` holding the result of `fn` is returned.

See the example below:

```
const fn = ({a, b, c}) => {
  return (a * b) + c
}
const curried = R.partialCurry(fn, {a: 2})
curried({b: 3, c: 10}) // => 16
```

- Note that `partialCurry` is method specific for **Rambda** and the method is not part of **Ramda**'s API

- You can read my argumentation for creating *partialCurry* [here](https://selfrefactor.gitbooks.io/blog/content/argumenting-rambdas-curry.html)

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/partialCurry.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20const%20fn%20%3D%20(%7Ba%2C%20b%2C%20c%7D)%20%3D%3E%20%7B%0A%20%20return%20(a%20*%20b)%20%2B%20c%0A%7D%0Aconst%20curried%20%3D%20R.partialCurry(fn%2C%20%7Ba%3A%202%7D)%0Acurried(%7Bb%3A%203%2C%20c%3A%2010%7D)%20%2F%2F%20%3D%3E%2016)

---
#### pick

> pick(propsToPick: Array<String>, obj: Object): Object

It returns a partial copy of an `obj` containing only `propsToPick` properties.

```
R.pick(['a', 'c'], {a: 1, b: 2}) // => {a: 1}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/pick.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.pick(%5B'a'%2C%20'c'%5D%2C%20%7Ba%3A%201%2C%20b%3A%202%7D)%20%2F%2F%20%3D%3E%20%7Ba%3A%201%7D)

---
#### pipe

> pipe(fn1: Function, ... , fnN: Function): any

It performs left-to-right function composition.
```
const result = R.pipe(
  R.filter(val => val > 2),
  R.map(a => a * 2)
)([1, 2, 3, 4])
console.log(result) // => [6, 8]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/pipe.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.pipe(%0A%20%20R.filter(val%20%3D%3E%20val%20%3E%202)%2C%0A%20%20R.map(a%20%3D%3E%20a%20*%202)%0A)(%5B1%2C%202%2C%203%2C%204%5D)%0Aconsole.log(result)%20%2F%2F%20%3D%3E%20%5B6%2C%208%5D)

---
#### pluck

> pluck(property: String, arr: Array): Array

It returns list of the values of `property` taken from the objects in array of objects `arr`.

```
R.pluck('a')([{a: 1}, {a: 2}, {b: 3}]) // => [1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/pluck.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.pluck('a')(%5B%7Ba%3A%201%7D%2C%20%7Ba%3A%202%7D%2C%20%7Bb%3A%203%7D%5D)%20%2F%2F%20%3D%3E%20%5B1%2C%202%5D)

---
#### prepend

> prepend(x: any, arr: Array): Array

It adds `x` to the start of the array `arr`.

```
R.prepend('foo', ['bar', 'baz']) // => ['foo', 'bar', 'baz']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/prepend.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.prepend('foo'%2C%20%5B'bar'%2C%20'baz'%5D)%20%2F%2F%20%3D%3E%20%5B'foo'%2C%20'bar'%2C%20'baz'%5D)

---
#### prop

> prop(propToFind: String, obj: Object): any

It returns `undefined` or the value of property `propToFind` in `obj`

```
R.prop('x', {x: 100}) // => 100
R.prop('x', {a: 1}) // => undefined
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/prop.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.prop('x'%2C%20%7Bx%3A%20100%7D)%20%2F%2F%20%3D%3E%20100%0AR.prop('x'%2C%20%7Ba%3A%201%7D)%20%2F%2F%20%3D%3E%20undefined)

---
#### propEq

> propEq(propToFind: String, valueToMatch: any, obj: Object): Boolean

It returns true if `obj` has property `propToFind` and its value is equal to `valueToMatch`

```
const propToFind = "foo"
const valueToMatch = 0
R.propEq(propToFind, valueToMatch)({foo: 0}) // => true
R.propEq(propToFind, valueToMatch)({foo: 1}) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/propEq.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20const%20propToFind%20%3D%20%22foo%22%0Aconst%20valueToMatch%20%3D%200%0AR.propEq(propToFind%2C%20valueToMatch)(%7Bfoo%3A%200%7D)%20%2F%2F%20%3D%3E%20true%0AR.propEq(propToFind%2C%20valueToMatch)(%7Bfoo%3A%201%7D)%20%2F%2F%20%3D%3E%20false)

---
#### range

> range(start: Number, end: Number): Array<Number>

It returns a array of numbers from `start`(inclusive) to `end`(exclusive).

```
R.range(0, 2)   // => [0, 1]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/range.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.range(0%2C%202)%20%20%20%2F%2F%20%3D%3E%20%5B0%2C%201%5D)

---
#### reduce

> reduce(iteratorFn: Function, accumulator: any, array: Array): any

```
const iteratorFn = (acc, val) => acc + val
R.reduce(iteratorFn, 1, [1, 2, 3])   // => 7
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/reduce.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20const%20iteratorFn%20%3D%20(acc%2C%20val)%20%3D%3E%20acc%20%2B%20val%0AR.reduce(iteratorFn%2C%201%2C%20%5B1%2C%202%2C%203%5D)%20%20%20%2F%2F%20%3D%3E%207)

---
#### reject

> reject(fn: Function, arr: Array): Array

It has the opposite effect of `R.filter`.

It will return those members of `arr` that return `false` when applied to function `fn`.

```
const fn = x => x % 2 === 1
R.reject(fn, [1, 2, 3, 4]) // => [2, 4]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/reject.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20const%20fn%20%3D%20x%20%3D%3E%20x%20%25%202%20%3D%3D%3D%201%0AR.reject(fn%2C%20%5B1%2C%202%2C%203%2C%204%5D)%20%2F%2F%20%3D%3E%20%5B2%2C%204%5D)

---
#### repeat

> repeat(valueToRepeat: T, num: Number): Array<T>

```
R.repeat('foo', 2) // => ['foo', 'foo']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/repeat.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.repeat('foo'%2C%202)%20%2F%2F%20%3D%3E%20%5B'foo'%2C%20'foo'%5D)

---
#### replace

> replace(strOrRegex: String|Regex, replacer: String, str: String): String

Replace `strOrRegex` found in `str` with `replacer`

```
R.replace('foo', 'bar', 'foo foo') // => 'bar foo'
R.replace(/foo/, 'bar', 'foo foo') // => 'bar foo'
R.replace(/foo/g, 'bar', 'foo foo') // => 'bar bar'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/replace.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.replace('foo'%2C%20'bar'%2C%20'foo%20foo')%20%2F%2F%20%3D%3E%20'bar%20foo'%0AR.replace(%2Ffoo%2F%2C%20'bar'%2C%20'foo%20foo')%20%2F%2F%20%3D%3E%20'bar%20foo'%0AR.replace(%2Ffoo%2Fg%2C%20'bar'%2C%20'foo%20foo')%20%2F%2F%20%3D%3E%20'bar%20bar')

---
#### reverse

```
const arr = [1, 2]
R.reverse(arr)
console.log(arr) // => [2, 1]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/reverse.js)

[Try in REPL](https://rambda.now.sh?const%20arr%20%3D%20%5B1%2C%202%5D%0AR.reverse(arr)%0Aconsole.log(arr)%20%2F%2F%20%3D%3E%20%5B2%2C%201%5D)

---
#### sort

> sort(sortFn: Function, arr: Array): Array

It returns copy of `arr` sorted by `sortFn`.

`sortFn` must return `Number`

```
const sortFn = (a, b) => a - b
R.sort(sortFn, [3, 1, 2]) // => [1, 2, 3]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/sort.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20const%20sortFn%20%3D%20(a%2C%20b)%20%3D%3E%20a%20-%20b%0AR.sort(sortFn%2C%20%5B3%2C%201%2C%202%5D)%20%2F%2F%20%3D%3E%20%5B1%2C%202%2C%203%5D)

---
#### sortBy

> sortBy(sortFn: Function, arr: Array): Array

It returns copy of `arr` sorted by `sortFn`.

`sortFn` must return value for comparison

```
const sortFn = obj => obj.foo

const result = R.sortBy(sortFn, [
  {foo: 1},
  {foo: 0}
])

const expectedResult = [ {foo: 0}, {foo: 1} ]
console.log(result === expectedResult) // => true 
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/sortBy.js)

[Try in REPL](https://rambda.now.sh?const%20sortFn%20%3D%20obj%20%3D%3E%20obj.foo%0A%0Aconst%20result%20%3D%20R.sortBy(sortFn%2C%20%5B%0A%20%20%7Bfoo%3A%201%7D%2C%0A%20%20%7Bfoo%3A%200%7D%0A%5D)%0A%0Aconst%20expectedResult%20%3D%20%5B%20%7Bfoo%3A%200%7D%2C%20%7Bfoo%3A%201%7D%20%5D%0Aconsole.log(result%20%3D%3D%3D%20expectedResult)%20%2F%2F%20%3D%3E%20true)

---
#### split

> split(separator: String, str: String): Array

```
R.split('-', 'a-b-c') // => ['a', 'b', 'c']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/split.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.split('-'%2C%20'a-b-c')%20%2F%2F%20%3D%3E%20%5B'a'%2C%20'b'%2C%20'c'%5D)

---
#### splitEvery

> splitEvery(sliceLength: Number, arrOrString: Array|String): Array

- Splits `arrOrStr` into slices of `sliceLength`

```
R.splitEvery(2, [1, 2, 3]) // => [[1, 2], [3]]
R.splitEvery(3, 'foobar') // => ['foo', 'bar']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/splitEvery.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.splitEvery(2%2C%20%5B1%2C%202%2C%203%5D)%20%2F%2F%20%3D%3E%20%5B%5B1%2C%202%5D%2C%20%5B3%5D%5D%0AR.splitEvery(3%2C%20'foobar')%20%2F%2F%20%3D%3E%20%5B'foo'%2C%20'bar'%5D)

---
#### startsWith

> startsWith(x: string, str: String): Boolean

```
R.startsWith(
  'foo',
  'foo-bar'
) // => true

R.startsWith(
  'bar',
  'foo-bar'
) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/startsWith.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.startsWith(%0A%20%20'foo'%2C%0A%20%20'foo-bar'%0A)%20%2F%2F%20%3D%3E%20true%0A%0AR.startsWith(%0A%20%20'bar'%2C%0A%20%20'foo-bar'%0A)%20%2F%2F%20%3D%3E%20false)

---
#### subtract

> subtract(a: Number, b: Number): Number

```
R.subtract(3, 1) // => 2
```

---
#### T

`R.T() // => true`

---
#### tail

> tail(arrOrStr: Array|String): Array|String

- It returns all but the first element of `arrOrStr`

```
R.tail([1, 2, 3])  // => [2, 3]
R.tail('foo')  // => 'oo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/tail.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.tail(%5B1%2C%202%2C%203%5D)%20%20%2F%2F%20%3D%3E%20%5B2%2C%203%5D%0AR.tail('foo')%20%20%2F%2F%20%3D%3E%20'oo')

---
#### take

> take(num: Number, arrOrStr: Array|String): Array|String

- It returns the first `num` elements of `arrOrStr`.

```
R.take(1, ['foo', 'bar']) // => ['foo']
R.take(2, ['foo']) // => 'fo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/take.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.take(1%2C%20%5B'foo'%2C%20'bar'%5D)%20%2F%2F%20%3D%3E%20%5B'foo'%5D%0AR.take(2%2C%20%5B'foo'%5D)%20%2F%2F%20%3D%3E%20'fo')

---
#### takeLast

> takeLast(num: Number, arrOrStr: Array|String): Array|String

- It returns the last `num` elements of `arrOrStr`.

```
R.takeLast(1, ['foo', 'bar']) // => ['bar']
R.takeLast(2, ['foo']) // => 'oo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/takeLast.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.takeLast(1%2C%20%5B'foo'%2C%20'bar'%5D)%20%2F%2F%20%3D%3E%20%5B'bar'%5D%0AR.takeLast(2%2C%20%5B'foo'%5D)%20%2F%2F%20%3D%3E%20'oo')

---
#### test

> test(regExpression: Regex, str: String): Boolean

- Determines whether `str` matches `regExpression`

```
R.test(/^f/, 'foo') // => true
R.test(/^f/, 'bar') // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/test.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.test(%2F%5Ef%2F%2C%20'foo')%20%2F%2F%20%3D%3E%20true%0AR.test(%2F%5Ef%2F%2C%20'bar')%20%2F%2F%20%3D%3E%20false)

---
#### times

> times(fn: Function, n: Number): Array

It returns the result of applying function `fn` over members of range array.
The range array includes numbers between `0` and `n`(exclusive).

```
R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/times.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.times(R.identity%2C%205)%3B%20%2F%2F%3D%3E%20%5B0%2C%201%2C%202%2C%203%2C%204%5D)

---
#### toLower

> toLower(str: String): String

```
R.toLower('FOO') // => 'foo'
```

---
#### toString
> toString(x: any): String

`R.toString([1, 2]) // => '1,2'`

---
#### toUpper

> toUpper(str: String): String

```
R.toUpper('foo') // => 'FOO'
```

---
#### trim

> trim(str: String): String
```
R.trim('  foo  ') // => 'foo'
```

---
#### type

> type(a: any): String

```
R.type(() => {}) // => "Function"
R.type(async () => {}) // => "Async"
R.type([]) // => "Array"
R.type({}) // => "Object"
R.type('foo') // => "String"
R.type(1) // => "Number"
R.type(true) // => "Boolean"
R.type(null) // => "Null"
R.type(/[A-z]/) // => "RegExp"

const delay = ms => new Promise(resolve => {
  setTimeout(function () {
    resolve()
  }, ms)
})
R.type(delay) // => "Promise"
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/type.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.type(()%20%3D%3E%20%7B%7D)%20%2F%2F%20%3D%3E%20%22Function%22%0AR.type(async%20()%20%3D%3E%20%7B%7D)%20%2F%2F%20%3D%3E%20%22Async%22%0AR.type(%5B%5D)%20%2F%2F%20%3D%3E%20%22Array%22%0AR.type(%7B%7D)%20%2F%2F%20%3D%3E%20%22Object%22%0AR.type('foo')%20%2F%2F%20%3D%3E%20%22String%22%0AR.type(1)%20%2F%2F%20%3D%3E%20%22Number%22%0AR.type(true)%20%2F%2F%20%3D%3E%20%22Boolean%22%0AR.type(null)%20%2F%2F%20%3D%3E%20%22Null%22%0AR.type(%2F%5BA-z%5D%2F)%20%2F%2F%20%3D%3E%20%22RegExp%22%0A%0Aconst%20delay%20%3D%20ms%20%3D%3E%20new%20Promise(resolve%20%3D%3E%20%7B%0A%20%20setTimeout(function%20()%20%7B%0A%20%20%20%20resolve()%0A%20%20%7D%2C%20ms)%0A%7D)%0AR.type(delay)%20%2F%2F%20%3D%3E%20%22Promise%22)

---
#### uniq

> uniq(arr: Array): Array

It returns a new array containing only one copy of each element in `arr`.

```
R.uniq([1, 1, 2, 1]) // => [1, 2]
R.uniq([1, '1'])     // => [1, '1']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/uniq.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.uniq(%5B1%2C%201%2C%202%2C%201%5D)%20%2F%2F%20%3D%3E%20%5B1%2C%202%5D%0AR.uniq(%5B1%2C%20'1'%5D)%20%20%20%20%20%2F%2F%20%3D%3E%20%5B1%2C%20'1'%5D)

---
#### uniqWith

> uniqWith(fn: Function, arr: Array): Array

It returns a new array containing only one copy of each element in `arr` according to boolean returning function `fn`.

```
const arr = [
  {id: 0, title:'foo'},
  {id: 1, title:'bar'},
  {id: 2, title:'baz'},
  {id: 3, title:'foo'},
  {id: 4, title:'bar'},
]

const expectedResult = [
  {id: 0, title:'foo'},
  {id: 1, title:'bar'},
  {id: 2, title:'baz'},
]

const fn = (x,y) => x.title === y.title

const result = R.uniqWith(fn, arr)

console.log(result === expectedResult) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/uniqWith.js)

[Try in REPL](https://rambda.now.sh?const%20arr%20%3D%20%5B%0A%20%20%7Bid%3A%200%2C%20title%3A'foo'%7D%2C%0A%20%20%7Bid%3A%201%2C%20title%3A'bar'%7D%2C%0A%20%20%7Bid%3A%202%2C%20title%3A'baz'%7D%2C%0A%20%20%7Bid%3A%203%2C%20title%3A'foo'%7D%2C%0A%20%20%7Bid%3A%204%2C%20title%3A'bar'%7D%2C%0A%5D%0A%0Aconst%20expectedResult%20%3D%20%5B%0A%20%20%7Bid%3A%200%2C%20title%3A'foo'%7D%2C%0A%20%20%7Bid%3A%201%2C%20title%3A'bar'%7D%2C%0A%20%20%7Bid%3A%202%2C%20title%3A'baz'%7D%2C%0A%5D%0A%0Aconst%20fn%20%3D%20(x%2Cy)%20%3D%3E%20x.title%20%3D%3D%3D%20y.title%0A%0Aconst%20result%20%3D%20R.uniqWith(fn%2C%20arr)%0A%0Aconsole.log(result%20%3D%3D%3D%20expectedResult)%20%2F%2F%20%3D%3E%20true)

---
#### update

> update(i: Number, replaceValue: any, arr: Array): Array

It returns a new copy of the `arr` with the element at `i` index
replaced with `replaceValue`.

```
R.update(0, "foo", ['bar', 'baz']) // => ['foo', baz]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/update.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.update(0%2C%20%22foo%22%2C%20%5B'bar'%2C%20'baz'%5D)%20%2F%2F%20%3D%3E%20%5B'foo'%2C%20baz%5D)

---
#### values

> values(obj: Object): Array

It returns array with of all values in `obj`.

```
R.values({a: 1, b: 2}) // => [1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/values.js)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.values(%7Ba%3A%201%2C%20b%3A%202%7D)%20%2F%2F%20%3D%3E%20%5B1%2C%202%5D)

---
#### without

> without(a: Array, b: Array): Array

It will return a new array based on `b` array.

This array contains all members of `b` array, that doesn't exist in `a` array.

Method `R.equals` is used to determine the existance of `b` members in `a` array.

```
R.without([1, 2], [1, 2, 3, 4]) // => [3, 4]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/modules/without.js)

## Benchmark

![Screen](https://cdn.rawgit.com/selfrefactor/rambda/7475b559/files/screen1.png)
![Screen](https://cdn.rawgit.com/selfrefactor/rambda/7475b559/files/screen2.png)

## Tree-shaking

![bundlephobia](https://user-images.githubusercontent.com/2149294/30378716-c8e43568-989c-11e7-81ee-aa9ec2c4bff2.png)

## Use with ES5

```
import omit from 'rambda/lib/omit'
```

## Changelog

- 1.0.9 Close [issue #58](https://github.com/selfrefactor/rambda/issues/58) - Incorrect `R.equals`
- 1.0.8 `R.map` and `R.filter` pass object properties when mapping over objects
- 1.0.7 Add `R.uniqWith`
- 1.0.6 Close [issue #52](https://github.com/selfrefactor/rambda/issues/52) - ES5 compatible code
- 1.0.5 Close [issue #51](https://github.com/selfrefactor/rambda/issues/51)
- 1.0.4 Close [issue #50](https://github.com/selfrefactor/rambda/issues/50) - add `R.pipe` typings
- 1.0.3 `R.ifElse` accept also boolean as condition argument
- 1.0.2 Remove `typedDefaultTo` and `typedPathOr` | Add `R.pickAll` and `R.none`
- 1.0.0 Major change as build is now ES6 not ES5 compatible (Related to [issue #46](https://github.com/selfrefactor/rambda/issues/46))| Making `Rambda` fully tree-shakeable| Edit Typescript definition
- 0.9.8 Revert to ES5 compatible build - [issue #46](https://github.com/selfrefactor/rambda/issues/46)
- 0.9.7 Refactor for `Rollup` tree-shake | Remove `R.padEnd` and `R.padStart`
- 0.9.6 Close [issue #44](https://github.com/selfrefactor/rambda/issues/44) - `R.reverse` mutates the array
- 0.9.5 Close [issue #45](https://github.com/selfrefactor/rambda/issues/45) - invalid Typescript typings
- 0.9.4 Add `R.reject` and `R.without` ([PR#41](https://github.com/selfrefactor/rambda/pull/41) [PR#42](https://github.com/selfrefactor/rambda/pull/42)) | Remove 'browser' field in `package.json` due to Webpack bug [4674](https://github.com/webpack/webpack/issues/4674)
- 0.9.3 Add `R.forEach` and `R.times`
- 0.9.2 Add `Typescript` definitions
- 0.9.1 Close [issue #36](https://github.com/selfrefactor/rambda/issues/36) - move current behaviour of `defaultTo` to a new method `typedDefaultTo`; make `defaultTo` follow Ramda spec; add `pathOr`; add `typedPathOr`.
- 0.9.0 Add `R.pipe` [PR#35](https://github.com/selfrefactor/rambda/pull/35)
- 0.8.9 Add `R.isNil`
- 0.8.8 Migrate to ES modules [PR33](https://github.com/selfrefactor/rambda/pull/33) | Add R.flip to the API | R.map/filter works with objects
- 0.8.7 Change `Webpack` with `Rollup` - [PR29](https://github.com/selfrefactor/rambda/pull/29)
- 0.8.6 Add `R.tap` and `R.identity`
- 0.8.5 Add `R.all`, `R.allPass`, `R.both`, `R.either` and `R.complement`
- 0.8.4 Learning to run `yarn test` before `yarn publish` the hard way
- 0.8.3 Add `R.always`, `R.T` and `R.F`
- 0.8.2 Add `concat`, `padStart`, `padEnd`, `lastIndexOf`, `toString`, `reverse`, `endsWith` and `startsWith` methods
- 0.8.1 Add `R.ifElse`
- 0.8.0 Add `R.not`, `R.includes` | Take string as condition for `R.pick` and `R.omit`
- 0.7.6 Fix incorrect implementation of `R.values`
- 0.7.5 Fix incorrect implementation of `R.omit`
- 0.7.4 [issue #13](https://github.com/selfrefactor/rambda/issues/13) - Fix `R.curry`, which used to return incorrectly `function` when called with more arguments
- 0.7.3 Close [issue #9](https://github.com/selfrefactor/rambda/issues/9) - Compile to `es2015`; Approve [PR #10](https://github.com/selfrefactor/rambda/pull/10) - add `R.addIndex` to the API
- 0.7.2 Add `Promise` support for `R.type`
- 0.7.1 Close [issue #7](https://github.com/selfrefactor/rambda/issues/7) - add `R.reduce` to the API
- 0.7.0 Close [issue #5](https://github.com/selfrefactor/rambda/issues/5) - change name of `curry` to `partialCurry`; add new method `curry`, which works just like Ramda's `curry`
- 0.6.2 Add separate documentation site via `docsify`

## Browse by category

### Function

          
[addIndex](#addindex)

            
[compose](#compose)

            
[curry](#curry)

            
[flip](#flip)

            
[pipe](#pipe)

            
[tap](#tap)

            

### Math

          
[add](#add)

            
[dec](#dec)

            
[divide](#divide)

            
[inc](#inc)

            
[modulo](#modulo)

            
[multiply](#multiply)

            
[subtract](#subtract)

            

### List

          
[adjust](#adjust)

            
[all](#all)

            
[any](#any)

            
[append](#append)

            
[concat](#concat)

            
[contains](#contains)

            
[drop](#drop)

            
[dropLast](#droplast)

            
[endsWith](#endswith)

            
[filter](#filter)

            
[find](#find)

            
[findIndex](#findindex)

            
[flatten](#flatten)

            
[forEach](#foreach)

            
[head](#head)

            
[indexOf](#indexof)

            
[init](#init)

            
[join](#join)

            
[last](#last)

            
[lastIndexOf](#lastindexof)

            
[length](#length)

            
[map](#map)

            
[none](#none)

            
[pluck](#pluck)

            
[prepend](#prepend)

            
[range](#range)

            
[reduce](#reduce)

            
[reject](#reject)

            
[repeat](#repeat)

            
[reverse](#reverse)

            
[sort](#sort)

            
[splitEvery](#splitevery)

            
[startsWith](#startswith)

            
[tail](#tail)

            
[take](#take)

            
[takeLast](#takelast)

            
[times](#times)

            
[uniq](#uniq)

            
[uniqWith](#uniqwith)

            
[update](#update)

            
[without](#without)

            

### Logic

          
[allPass](#allpass)

            
[anyPass](#anypass)

            
[both](#both)

            
[defaultTo](#defaultto)

            
[either](#either)

            
[ifElse](#ifelse)

            

### Object

          
[has](#has)

            
[merge](#merge)

            
[omit](#omit)

            
[path](#path)

            
[pathOr](#pathor)

            
[pick](#pick)

            
[pickAll](#pickall)

            
[prop](#prop)

            
[values](#values)

            

### Relation

          
[equals](#equals)

            
[propEq](#propeq)

            
[sortBy](#sortby)

            

### Type

          
[is](#is)

            
[isNil](#isnil)

            
[type](#type)

            

### String

          
[match](#match)

            
[replace](#replace)

            
[split](#split)

            
[test](#test)

            
[toLower](#tolower)

            
[toString](#tostring)

            
[toUpper](#toupper)

## Additional info

> Running benchmarks

- To run all benchmarks

`yarn run benchmark all`

- To run single or number of benchmarks

`yarn run benchmark add compose filter`

> Libraries using Rambda

- [ig-api](https://www.npmjs.com/package/ig-api)

- [ldap-authenticate](https://www.npmjs.com/package/ldap-authenticate)

- [json-validity](https://www.npmjs.com/package/json-validity)

- [log-fn](https://www.npmjs.com/package/log-fn)

- [string-fn](https://www.npmjs.com/package/string-fn)

- [watch-fn](https://www.npmjs.com/package/watch-fn)

> Articles about Rambda
- [Interview with Dejan Totef at SurviveJS blog](https://survivejs.com/blog/rambda-interview/)
- [Argumentation of Rambda's curry method](https://selfrefactor.gitbooks.io/blog/content/argumenting-rambdas-curry.html)

[Try in REPL](https://rambda.now.sh?const%20result%20%3D%20R.without(%5B1%2C%202%5D%2C%20%5B1%2C%202%2C%203%2C%204%5D)%20%2F%2F%20%3D%3E%20%5B3%2C%204%5D)

