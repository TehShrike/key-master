module.exports = function(constructor) {
	var map = {}

	function get(key) {
		if (typeof map[key] === 'undefined' && typeof constructor === 'function') {
			map[key] = new constructor(key)
		}

		return map[key]
	}

	function remove(key) {
		return delete map[key]
	}

	function set(key, value) {
		return map[key] = value
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
