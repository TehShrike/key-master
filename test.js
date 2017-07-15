const test = require('tape')
const KeyMaster = require('./')

function testWithMapConstructor(t, Constructor) {
	const newMap = () => Constructor ? new Constructor() : undefined

	t.test('has', t => {
		const map = new KeyMaster(() => t.fail('No need for the constructor function'), newMap())
		t.false(map.has('x'))
		t.end()
	})

	t.test('set and get', t => {
		const map = new KeyMaster(() => t.fail('No need for the constructor function'), newMap())

		map.set('key1', 1)
		map.set('key2', 2)
		t.equal(map.get('key1'), 1)
		t.end()
	})

	t.test('constructor and get', t => {
		const constructorCreatedObjects = []

		const map = new KeyMaster(() => {
			const o = {}
			constructorCreatedObjects.push(o)
			return o
		}, newMap())

		t.equal(map.get('key1'), constructorCreatedObjects[0])
		t.equal(map.get('key2'), constructorCreatedObjects[1])
		t.equal(map.get('key1'), constructorCreatedObjects[0])
		t.end()
	})

	t.test('deleting', t => {
		const constructorCreatedObjects = []

		const map = new KeyMaster(() => {
			const o = {}
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

	t.test('friendly names', t => {
		const map = new KeyMaster(() => {}, newMap())

		t.equal(map.put, map.set)
		t.equal(map.put, map.add)

		t.equal(map.delete, map.remove)
		t.equal(map.delete, map.unset)
		t.end()
	})

	t.test('no factory', t => {
		const map = new KeyMaster(undefined, newMap())

		map.set('key1', 3)
		map.set('key1')
		map.set('key2')

		t.equal(map.get('key1'), undefined)
		t.equal(map.get('key2'), undefined)
		t.end()
	})

	t.test('pass the key to the factory', t => {
		const map = new KeyMaster(key => ({ value: key + ' returned' }), newMap())

		t.equal(map.get('first').value, 'first returned')
		t.equal(map.get('last').value, 'last returned')
		t.end()
	})

	t.test('Make sure the factory can return a function', t => {
		const map = new KeyMaster(key => () => 'yes', newMap())

		t.equal(map.get()(), 'yes')
		t.end()
	})

	t.test('__proto__ key works', t => {
		const map = new KeyMaster(key => 'legit', newMap())

		t.equal(map.get('__proto__'), 'legit')
		t.end()
	})

	t.test('has returns true even with undefined value', t => {
		const map = new KeyMaster(key => key, newMap())

		t.false(map.has('key'))
		map.set('key', undefined)
		t.true(map.has('key'))
		t.end()
	})
}

test('All basic tests with no constructor', t => {
	testWithMapConstructor(t, null)
})

test('All basic tests with Map', t => {
	testWithMapConstructor(t, Map)
})

test('uses map that is passed in', t => {
	const input = new Map()
	const map = new KeyMaster(key => 'coffee', input)

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
