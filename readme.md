# key-master

Replaces "maintain a map of constructed objects" boilerplate.

[![Build Status](https://travis-ci.org/TehShrike/key-master.svg)](https://travis-ci.org/TehShrike/key-master)
![TypeScript supported](https://img.shields.io/npm/types/key-master.svg)

Seen this pattern before?

<!-- js
var keyMaster = require('./dist')
function actuallyDoStuff() {

}
-->

```js
const defaultValue = key => [ key ]

const myMap = new Map()

// ...

function doStuff(thing) {
	if (!myMap.has(thing)) {
		myMap.set(thing, defaultValue(thing))
	}

	actuallyDoStuff(myMap.get(thing))
}
```

I figure I've typed that enough times in my life.  Now I'm going to just use this module.

```js
const map = keyMaster(key => defaultValue(key))

map.get('howdy') // => [ 'howdy' ]

actuallyDoStuff(map.get('howdy'))
```

# Usage

- Install: `npm install key-master`
- Use: `const keyMaster = require('key-master')`

This library uses ES2015 syntax, so if you're deploying to IE11, you'll need to be transpiling your project with Babel or something.

## API

`const map = keyMaster(defaultValueReturningFunction, [map])`

The `defaultValueReturningFunction` is called whenever the map doesn't already have a value for the given key.

It is passed the key as its first argument.

The `map` argument is optional. It can be anything implementing `.get`, `.set`, `.has`, and `.delete`. If not passed in, `keyMaster` will use a new JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) by default.

`const map = keyMaster(yourFactory)`

`const map = keyMaster(yourFactory, new WeakMap())`

`const map = keyMaster(yourFactory, new Map())`

`const map = keyMaster(yourFactory, { get, set, has, delete })`

### `value = map.get(key)`

Returns the value in the map.  If there isn't a value for that key, the constructor calls the `defaultValueReturningFunction` that was passed to the constructor, passing in the key.  Whatever the constructor function returns is inserted into the map and returned by `get`.

### `map.set(key, value)`

Inserts a value into the map, overwriting anything that might be there.

### `map.delete(key)`

Removes a value from the map.

### `bool = map.has(key)`

Returns `true` if the key exists in the map, `false` if the key does not exist in the map.

### `jsMap = map.getUnderlyingDataStructure()`

Returns the underlying data structure.  If you passed in a map to the constructor, it returns that.  Otherwise, it returns the plain-old object that was used as a hashmap.

## Using a plain-old-object as a map

If you want to use an object as a map instead of a `Map` or `WeakMap`, you can use this function to create a map to pass in:

```js
function makeObjectMap() {
	var obj = Object.create(null)

	return {
		get: function(key) {
			return obj[key]
		},
		set: function(key, value) {
			obj[key] = value
		},
		has: function(key) {
			return Object.prototype.hasOwnProperty.call(obj, key)
		},
		delete: function(key) {
			delete obj[key]
		},
		object: obj
	}
}
```

# License

[WTFPL](http://wtfpl2.com)
