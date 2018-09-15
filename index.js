module.exports = (factory, map = new Map()) => {

	function get(key) {
		if (!map.has(key) && typeof factory === 'function') {
			map.set(key, factory(key))
		}

		return map.get(key)
	}

	return {
		has: key => map.has(key),
		get,
		delete: key => map.delete(key),
		set: (key, value) => map.set(key, value),
		getUnderlyingDataStructure: () => map,
	}
}
