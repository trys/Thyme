# Thyme

For when you need dates, but not times, and certainly not timezones.

## Get started

```js
import Thyme from '...'

const a = new Thyme('2018-10-02')
const b = new Thyme('2018-10-05')
```

## Comparison

```js
a.equals(b)
// false

a.equals(a)
// true
```

## Range of dates

```js
const range = a.till(b)

range.contains(a)
// true
```

## Date-like methods

```js
a.getFullYear()
// 2018

/* Zero-based */
a.getMonth()
// 9

a.getDate()
// 2

a.getDay()
// 2
```

## Add/Remove days

```
a.add()
// 2018-10-03

a.add(2)
// 2018-10-05

a.remove()
// 2018-10-04
```
