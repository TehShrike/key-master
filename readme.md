# key-master

Replaces "maintain a map of constructed objects" boilerplate.

[![Build Status](https://travis-ci.org/TehShrike/key-master.svg)](https://travis-ci.org/TehShrike/key-master)

Seen this pattern before?

<!-- js
var KeyMaster = require('./')
function actuallyDoStuff() {

}
-->

```js

function defaultValue(key) {
	return [ key ]
}

var map = {}

// ...

function doStuff(thing) {
	if (!map[thing]) {
		map[thing] = defaultValue(thing)
	}

	actuallyDoStuff(map[thing])
}

```

I figure I've typed that enough times in my life.  Now I'm going to just use this module.

```js

var map = new KeyMaster(key => defaultValue(key))

map.get('howdy') // => [ 'howdy' ]

actuallyDoStuff(map.get('howdy'))

```

# Usage

- Install: `npm install key-master`
- Use: `var KeyMaster = require('key-master')`

## Constructor

`var map = KeyMaster(defaultValueReturningFunction, [map])`

The `defaultValueReturningFunction` is called whenever the map doesn't already have a value for the given key.

It is passed the key as its first argument.

The `map` argument is optional. It can be anything implementing `.get`, `.set`, `.has`, and `.delete`. If not passed in, `KeyMaster` will use a plain javascript object internally.

`new KeyMaster(yourFactory, new WeakMap())`

`new KeyMaster(yourFactory, new Map())`

`new KeyMaster(yourFactory, { get, set, has, delete })`

## `map.get(key)`

Returns the value in the map.  If there isn't a value for that key, the constructor calls the `defaultValueReturningFunction` that was passed to the constructor, passing in the key.  Whatever the constructor function returns is inserted into the map and returned by `get`.

## Setters

`map.set(key, value)`, `map.put(key, value)`, `map.add(key, value)`

Inserts a value into the map, overwriting anything that might be there.

## Deleters

`map.delete(key)`, `map.remove(key)`, `map.unset(key)`

Removes a value from the map.

## `map.has(key)`

Returns `true` if the key exists in the map, `false` if the key does not exist in the map.

## `map.getUnderlyingDataStructure()`

Returns the underlying data structure.  If you passed in a map to the constructor, it returns that.  Otherwise, it returns the plain-old object that was used as a hashmap.

# License

[WTFPL](http://wtfpl2.com)
