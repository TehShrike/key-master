# key-master

Replaces "maintain a map of constructed objects" boilerplate.

[![Build Status](https://travis-ci.org/TehShrike/key-master.svg)](https://travis-ci.org/TehShrike/key-master)

Seen this pattern before?

```js

var map = {}

// ...

function doStuff(thing) {
	if (!map[thing]) {
		map[thing] = defaultValueFactory()
	}

	actuallyDoStuff(map[thing])
}

```

I figure I've typed that enough times in my life.  Now I'm going to just use this module.

```js

var KeyMaster = require('key-master')

var map = new KeyMaster(defaultValueFactory)

// ...

actuallyDoStuff(map.get(thing))

```

# Usage

- Install: `npm install key-master`
- Use: `var KeyMaster = require('key-master')`

## Constructor

`var map = KeyMaster(defaultValueReturningFunction)`

The `defaultValueReturningFunction` is called whenever the map doesn't already have a value for the given key.

It is passed the key as its first argument.

## Getter

`map.get(key)`

Returns the value in the map.  If there isn't a value for that key, the constructor calls the `defaultValueReturningFunction` that was passed to the constructor, passing in the key.  Whatever the constructor function returns is inserted into the map and returned by `get`.

## Setters

`map.set(key, value)`, `map.put(key, value)`, `map.add(key, value)`

Inserts a value into the map, overwriting anything that might be there.

## Deleters

`map.delete(key)`, `map.remove(key)`, `map.unset(key)`

Removes a value from the map.

# License

[WTFPL](http://wtfpl2.com)
