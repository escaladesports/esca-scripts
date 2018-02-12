export default function(options){
	console.log(`Building Babel config...`)
	const babelPresets = [
		'stage-3',
	]
	const babelPlugins = []

	if(options.es6){
		console.log(`Building babel config for ES6...`)
		babelPresets.unshift('es2016')
	}
	else{
		babelPresets.unshift('es2015')
	}
	if (options.browser) {
		console.log(`Building babel config for browser...`)
		babelPlugins.push([
			'transform-runtime', {
				polyfill: false,
				regenerator: true
			}
		])
	}
	if (options.component) {
		console.log(`Building babel config for component...`)
		babelPlugins.push('add-module-exports')
	}
	if (options.react) {
		console.log(`Building babel config for React...`)


		babelPresets.length = 0
		babelPlugins.length = 0
		if (options.browser) {
			babelPlugins.push([
				'transform-runtime', {
					polyfill: false,
					regenerator: true
				}
			])
			babelPresets.push('es2015')
		}
		if (options.component) {
			babelPlugins.push('add-module-exports')
		}


		babelPresets.push(
			'react',
			'stage-3'
		)
		babelPlugins.push(
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
		babelPresets,
		babelPlugins,
	}
}
