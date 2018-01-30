import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import camel from 'camelcase'

let pkg = require('./package.json')

const rc = babelrc()
const doesNotAcceptOptions = ['stage-3']
const acceptsOptionModules = ['es2015']
rc.presets.forEach((preset, i) => {
	if (doesNotAcceptOptions.indexOf(preset[0]) > -1) {
		rc.presets[i] = preset[0]
	}
	else if (acceptsOptionModules.indexOf(preset[0]) === -1) {
		delete preset[1].modules // eslint-disable-line
	}
})

let plugins = [
	nodeResolve({
		jsnext: true,
		main: true,
		browser: true,
	}),
	commonjs({
		include: "node_modules/**",
	}),
	babel(rc),
]

export default {
	entry: 'src/index.js',
	plugins: plugins,
	moduleName: camel(pkg.name),
	sourceMap: true,
	targets: [
		{
			dest: pkg.main,
			format: 'umd',
		},
		{
			dest: pkg.module,
			format: 'es',
		}
	]
}
