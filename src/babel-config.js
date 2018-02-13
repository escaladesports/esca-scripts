export default function(options){
	console.log(`Building Babel config...`)
	const presets = [
		'stage-3',
	]
	const plugins = []

	if(options.es6){
		console.log(`Building babel config for ES6...`)
		presets.unshift('es2016')
	}
	else{
		presets.unshift('es2015')
	}
	plugins.push([
		'transform-runtime', {
			polyfill: false,
			regenerator: true
		}
	])
	if (options.component) {
		console.log(`Building babel config for component...`)
		plugins.push('add-module-exports')
	}
	if (options.react) {
		console.log(`Building babel config for React...`)
		presets.push('react')
		plugins.push(
			["styled-jsx/babel", {
				"plugins": [
					"styled-jsx-plugin-postcss"
				]
			}],
			["transform-react-remove-prop-types", {
				"mode": "wrap"
			}]
		)
	}

	return {
		presets,
		plugins,
	}
}
