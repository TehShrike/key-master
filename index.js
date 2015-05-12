module.exports = function(constructor) {
	var map = {}

	function get(key) {
		if (typeof map[key] === 'undefined') {
			map[key] = constructor()
		}

		return map[key]
	}

	function remove(key) {
		delete map[key]
	}

	function set(key, value) {
		map[key] = value
	}

	return {
		get: get,
		remove: remove,
		delete: remove,
		unset: remove,
		set: set,
		put: set,
		add: set
	}
}
