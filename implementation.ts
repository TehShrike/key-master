export interface IUnderlyingMap<K, V> {
	has(key: K): boolean
	get(key: K): V | undefined
	delete(key: K): boolean
	set(key: K, value: V): void
}

export interface IManagedMap<K, V> {
	has(key: K): boolean
	get(key: K): V
	delete(key: K): boolean
	set(key: K, value: V): void
	getUnderlyingDataStructure(): IUnderlyingMap<K, V>
}

type ValueFactory<K, V> = (key: K) => V

export default function mapFactory<K, V>(
	factory: ValueFactory<K, V>,
	map: IUnderlyingMap<K, V> = new Map<K, V>(),
): IManagedMap<K, V> {
	return {
		has: (key: K): boolean => map.has(key),
		get: (key: K): V => {
			if (!map.has(key)) {
				map.set(key, factory(key))
			}

			return map.get(key)!
		},
		delete: (key: K): boolean => map.delete(key),
		set: (key: K, value: V): void => {
			map.set(key, value)
		},
		getUnderlyingDataStructure: (): IUnderlyingMap<K, V> => map,
	}
}
