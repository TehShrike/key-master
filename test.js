var test = require('tape')
var KeyMaster = require('./')

function testWithMapConstructor(t, Constructor) {
	function newMap() {
		return Constructor ? new Constructor() : undefined
	}
	t.test('has', function(t) {
		var map = new KeyMaster(function() {
			t.fail('No need for the constructor function')
		}, newMap())
		t.false(map.has('x'))
		t.end()
	})

	t.test('set and get', function(t) {
		var map = new KeyMaster(function() {
			t.fail('No need for the constructor function')
		}, newMap())

		map.set('key1', 1)
		map.set('key2', 2)
		t.equal(map.get('key1'), 1)
		t.end()
	})

	t.test('constructor and get', function(t) {
		var constructorCreatedObjects = []

		var map = new KeyMaster(function() {
			var o = {}
			constructorCreatedObjects.push(o)
			return o
		}, newMap())

		t.equal(map.get('key1'), constructorCreatedObjects[0])
		t.equal(map.get('key2'), constructorCreatedObjects[1])
		t.equal(map.get('key1'), constructorCreatedObjects[0])
		t.end()
	})

	t.test('deleting', function(t) {
		var constructorCreatedObjects = []

		var map = new KeyMaster(function() {
			var o = {}
			constructorCreatedObjects.push(o)
			return o
		}, newMap())

		t.equal(map.get('key1'), constructorCreatedObjects[0])
		t.equal(map.get('key2'), constructorCreatedObjects[1])
		t.equal(map.get('key1'), constructorCreatedObjects[0])
		map.remove('key1')
		t.equal(map.get('key2'), constructorCreatedObjects[1])
		t.equal(map.get('key1'), constructorCreatedObjects[2])

		t.end()
	})

	t.test('friendly names', function(t) {
		var map = new KeyMaster(function() {}, newMap())

		t.equal(map.put, map.set)
		t.equal(map.put, map.add)

		t.equal(map.delete, map.remove)
		t.equal(map.delete, map.unset)
		t.end()
	})

	t.test('no factory', function(t) {
		var map = new KeyMaster(undefined, newMap())

		map.set('key1', 3)
		map.set('key1')
		map.set('key2')

		t.equal(map.get('key1'), undefined)
		t.equal(map.get('key2'), undefined)
		t.end()
	})

	t.test('pass the key to the factory', function(t) {
		var map = new KeyMaster(function(key) {
			return { value: key + ' returned' }
		}, newMap())

		t.equal(map.get('first').value, 'first returned')
		t.equal(map.get('last').value, 'last returned')
		t.end()
	})

	t.test('Make sure the factory can return a function', function(t) {
		var map = new KeyMaster(function(key) {
			return function() {
				return 'yes'
			}
		}, newMap())

		t.equal(map.get()(), 'yes')
		t.end()
	})

	t.test('__proto__ key works', function(t) {
		var map = new KeyMaster(function(key) {
			return 'legit'
		}, newMap())

		t.equal(map.get('__proto__'), 'legit')
		t.end()
	})

	t.test('has returns true even with undefined value', function(t) {
		var map = new KeyMaster(function(key) {
			return key
		}, newMap())

		t.false(map.has('key'))
		map.set('key', undefined)
		t.true(map.has('key'))
		t.end()
	})
}

test('All basic tests with no constructor', function(t) {
	testWithMapConstructor(t, null)
})

test('All basic tests with Map', function(t) {
	testWithMapConstructor(t, Map)
})

test('uses map that is passed in', function(t) {
	var input = new Map()
	var map = new KeyMaster(function(key) {
		return 'coffee'
	}, input)

	map.get('mug')
	t.equal(input.get('mug'), 'coffee')

	t.false(map.has('x'))
	map.set('x', 1)
	t.true(map.has('x'))
	t.equal(input.get('x'), 1)

	map.delete('x')
	t.false(map.has('x'))
	t.false(input.has('x'))

	t.end()
})
