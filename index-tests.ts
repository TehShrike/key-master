import keyMaster = require('./index')

interface IUnderlyingMap<K, V> {
	has(key: K): boolean
	get(key: K): V | undefined
	delete(key: K): boolean
	set(key: K, value: V): this
}

interface IKey {
	key: 'key'
}

interface IValue {
	value: 'value'
}

const m1 = keyMaster<IKey, IValue>()
const m1r1: boolean = m1.has({key: 'key'})
const m1r2: undefined | IValue = m1.get({key: 'key'})
const m1r3: boolean = m1.delete({key: 'key'})
const m1r4: void = m1.set({key: 'key'}, {value: 'value'})
const m1r5: Map<IKey, IValue> = m1.getUnderlyingDataStructure()

const m2 = keyMaster<number, number>(() => 1)
const m2r1: boolean = m2.has(1)
const m2r2: number = m2.get(1)
const m2r3: boolean = m2.delete(1)
const m2r4: void = m2.set(1, 2)
const m2r5: Map<number, number> = m2.getUnderlyingDataStructure()

const m3 = keyMaster<IKey, string, WeakMap<IKey, string>>(undefined, new WeakMap<IKey, string>())
const m3r1: boolean = m3.has({key: 'key'})
const m3r2: undefined | string = m3.get({key: 'key'})
const m3r3: boolean = m3.delete({key: 'key'})
const m3r4: void = m3.set({key: 'key'}, '')
const m3r5: WeakMap<IKey, string> = m3.getUnderlyingDataStructure()

const m4 = keyMaster<IKey, number, WeakMap<IKey, number>>(() => 1, new WeakMap<IKey, number>())
const m4r1: boolean = m4.has({key: 'key'})
const m4r2: number = m4.get({key: 'key'})
const m4r3: boolean = m4.delete({key: 'key'})
const m4r4: void = m4.set({key: 'key'}, 2)
const m4r5: WeakMap<IKey, number> = m4.getUnderlyingDataStructure()
