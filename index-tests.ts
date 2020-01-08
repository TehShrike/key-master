import keyMaster from './index'

interface IUnderlyingMap<K, V> {
	has(key: K): boolean
	get(key: K): V | undefined
	delete(key: K): boolean
	set(key: K, value: V): void
}

interface IKey {
	key: 'key'
}

const m1 = keyMaster<number, number>(() => 1)
const m1r1: boolean = m1.has(1)
const m1r2: number = m1.get(1)
const m1r3: boolean = m1.delete(1)
const m1r4: void = m1.set(1, 2)
const m1r5: IUnderlyingMap<number, number> = m1.getUnderlyingDataStructure()

const m2 = keyMaster<IKey, number>(() => 1, new WeakMap<IKey, number>())
const m2r1: boolean = m2.has({key: 'key'})
const m2r2: number = m2.get({key: 'key'})
const m2r3: boolean = m2.delete({key: 'key'})
const m2r4: void = m2.set({key: 'key'}, 2)
const m2r5: IUnderlyingMap<IKey, number> = m2.getUnderlyingDataStructure()
