import mapFactory from './implementation.js'

export * from './implementation.js'
export default mapFactory

// work-around for https://github.com/webpack/webpack/issues/6584
try { // we cannot check for existence of the module object, Webpack would "simplify" the condition to false.
	// Check if we are dealing with Webpack's harmony-module.js wrapper.
	// @ts-ignore
	if (Object.getOwnPropertyDescriptor(module, 'exports').writable === false) {
		Object.defineProperty(mapFactory, '__esModule', {value: true})
		Object.defineProperty(mapFactory, 'default', {enumerable: true, value: mapFactory})
		// @ts-ignore
		const realModule = Object.getPrototypeOf(module)
		realModule.exports = mapFactory
	}
} catch {} // tslint:disable-line:no-empty
