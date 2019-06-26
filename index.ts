interface IUnderlyingMap<K, V> {
	has(key: K): boolean
	get(key: K): V | undefined
	delete(key: K): boolean
	set(key: K, value: V): this
}

interface IManagedMap<K, V, GR, U extends IUnderlyingMap<K, V>> {
	has(key: K): boolean
	get(key: K): GR
	delete(key: K): boolean
	set(key: K, value: V): U
	getUnderlyingDataStructure(): U
}

type ValueFactory<K, V> = (key: K) => V

function mapFactory<K, V, U extends IUnderlyingMap<K, V> = Map<K, V>>(
	factory?: undefined,
	map?: U,
): IManagedMap<K, V, undefined | V, U>
function mapFactory<K, V, U extends IUnderlyingMap<K, V> = Map<K, V>>(
	factory: ValueFactory<K, V>,
	map?: U,
): IManagedMap<K, V, V, U>
function mapFactory<K, V, U extends IUnderlyingMap<K, V> = Map<K, V>>(
	factory?: ValueFactory<K, V>,
	map: U = new Map<K, V>() as unknown as U,
): IManagedMap<K, V, undefined | V, U> {
	return {
		has: (key: K): boolean => map.has(key),
		get: (key: K): undefined | V => {
			if (!map.has(key) && typeof factory === 'function') {
				map.set(key, factory(key))
			}

			return map.get(key)
		},
		delete: (key: K): boolean => map.delete(key),
		set: (key: K, value: V): U => map.set(key, value),
		getUnderlyingDataStructure: (): U => map,
	}
}

export = mapFactory
