interface IUnderlyingMap<K, V> {
	has(key: K): boolean
	get(key: K): V | undefined
	delete(key: K): boolean
	set(key: K, value: V): this
}

interface IManagedMap<K, V, GR = V> {
	has(key: K): boolean
	get(key: K): GR
	delete(key: K): boolean
	set(key: K, value: V): IUnderlyingMap<K, V>
	getUnderlyingDataStructure(): IUnderlyingMap<K, V>
}

type ValueFactory<K, V> = (key: K) => V

function mapFactory<K, V>(factory?: undefined, map?: IUnderlyingMap<K, V>): IManagedMap<K, V, undefined | V>
function mapFactory<K, V>(factory: ValueFactory<K, V>, map?: IUnderlyingMap<K, V>): IManagedMap<K, V>
function mapFactory<K, V, F extends undefined | ValueFactory<K, V> = undefined | ValueFactory<K, V>>(
	factory?: F,
	map: IUnderlyingMap<K, V> = new Map(),
): IManagedMap<K, V, undefined | V> {
	return {
		has: (key: K): boolean => map.has(key),
		get: (key: K): undefined | V => {
			if (!map.has(key) && typeof factory === 'function') {
				map.set(key, factory(key))
			}

			return map.get(key)
		},
		delete: (key: K): boolean => map.delete(key),
		set: (key: K, value: V): IUnderlyingMap<K, V> => map.set(key, value),
		getUnderlyingDataStructure: (): IUnderlyingMap<K, V> => map,
	}
}

export = mapFactory
