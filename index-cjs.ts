import mapFactory from './implementation.js'

// Improve compatibility with ES module loaders
Object.defineProperty(mapFactory, '__esModule', {value: true})
Object.defineProperty(mapFactory, 'default', {enumerable: true, value: mapFactory})

export = mapFactory
