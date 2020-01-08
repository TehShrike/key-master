require(`ts-node/register`)
const test = require(`tape`)
const KeyMaster = require(`./index.ts`).default

function testWithMapConstructor(t, Constructor) {
	const newMap = () => Constructor ? new Constructor() : undefined

	t.test(`has`, t => {
		const map = KeyMaster(() => t.fail(`No need for the constructor function`), newMap())
		t.false(map.has(`x`))
		t.end()
	})

	t.test(`set and get`, t => {
		const map = KeyMaster(() => t.fail(`No need for the constructor function`), newMap())

		map.set(`key1`, 1)
		map.set(`key2`, 2)
		t.equal(map.get(`key1`), 1)
		t.end()
	})

	t.test(`constructor and get`, t => {
		const constructorCreatedObjects = []

		const map = KeyMaster(() => {
			const o = {}
			constructorCreatedObjects.push(o)
			return o
		}, newMap())

		t.equal(map.get(`key1`), constructorCreatedObjects[0])
		t.equal(map.get(`key2`), constructorCreatedObjects[1])
		t.equal(map.get(`key1`), constructorCreatedObjects[0])
		t.end()
	})

	t.test(`deleting`, t => {
		const constructorCreatedObjects = []

		const map = KeyMaster(() => {
			const o = {}
			constructorCreatedObjects.push(o)
			return o
		}, newMap())

		t.equal(map.get(`key1`), constructorCreatedObjects[0])
		t.equal(map.get(`key2`), constructorCreatedObjects[1])
		t.equal(map.get(`key1`), constructorCreatedObjects[0])
		map.delete(`key1`)
		t.equal(map.get(`key2`), constructorCreatedObjects[1])
		t.equal(map.get(`key1`), constructorCreatedObjects[2])

		t.end()
	})

	t.test(`setting undefined values`, t => {
		const map = KeyMaster(k => k, newMap())

		map.set(`key1`, 3)
		map.set(`key1`)
		map.set(`key2`)

		t.equal(map.get(`key1`), undefined)
		t.equal(map.get(`key2`), undefined)
		t.end()
	})

	t.test(`no factory`, t => {
		const map = KeyMaster(undefined, newMap())

		t.throws(() => {
			map.get(`key1`)
		})
		t.end()
	})

	t.test(`pass the key to the factory`, t => {
		const map = KeyMaster(key => ({ value: key + ` returned` }), newMap())

		t.equal(map.get(`first`).value, `first returned`)
		t.equal(map.get(`last`).value, `last returned`)
		t.end()
	})

	t.test(`Make sure the factory can return a function`, t => {
		const map = KeyMaster(key => () => `yes`, newMap())

		t.equal(map.get()(), `yes`)
		t.end()
	})

	t.test(`__proto__ key works`, t => {
		const map = KeyMaster(key => `legit`, newMap())

		t.equal(map.get(`__proto__`), `legit`)
		t.end()
	})

	t.test(`has returns true even with undefined value`, t => {
		const map = KeyMaster(key => key, newMap())

		t.false(map.has(`key`))
		map.set(`key`, undefined)
		t.true(map.has(`key`))
		t.end()
	})
}

test(`All basic tests with no constructor`, t => {
	testWithMapConstructor(t, null)
})

test(`All basic tests with Map`, t => {
	testWithMapConstructor(t, Map)
})

test(`uses map that is passed in`, t => {
	const input = new Map()
	const map = KeyMaster(key => `coffee`, input)

	map.get(`mug`)
	t.equal(input.get(`mug`), `coffee`)

	t.false(map.has(`x`))
	map.set(`x`, 1)
	t.true(map.has(`x`))
	t.equal(input.get(`x`), 1)

	map.delete(`x`)
	t.false(map.has(`x`))
	t.false(input.has(`x`))

	t.end()
})

test(`Returning underlying data structure with default Map`, t => {
	const map = KeyMaster(key => `coffee`)

	map.get(`heh`)

	const output = map.getUnderlyingDataStructure()

	t.ok(output instanceof Map)

	t.end()
})

test(`Returning underlying data structure with Map`, t => {
	const input = new Map()
	const map = KeyMaster(key => `coffee`, input)

	map.get(`heh`)

	const output = map.getUnderlyingDataStructure()

	t.equal(input, output)

	t.end()
})


