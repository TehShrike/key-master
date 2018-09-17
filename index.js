module.exports = (factory, map = new Map()) => ({
	has: key => map.has(key),
	get: key => {
		if (!map.has(key) && typeof factory === 'function') {
			map.set(key, factory(key))
		}

		return map.get(key)
	},
	delete: key => map.delete(key),
	set: (key, value) => map.set(key, value),
	getUnderlyingDataStructure: () => map,
})
