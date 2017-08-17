function basicObjectMap() {
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

module.exports = function(factory, inputMap) {
	var map = inputMap || basicObjectMap()

	function has(key) {
		return map.has(key)
	}

	function get(key) {
		if (!map.has(key) && typeof factory === 'function') {
			map.set(key, factory(key))
		}

		return map.get(key)
	}

	function remove(key) {
		map.delete(key)
	}

	function set(key, value) {
		map.set(key, value)
	}

	function getUnderlyingDataStructure() {
		return inputMap || map.object
	}

	return {
		has: has,
		get: get,
		remove: remove,
		delete: remove,
		unset: remove,
		set: set,
		put: set,
		add: set,
		getUnderlyingDataStructure,
	}
}
