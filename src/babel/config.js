function createConfig(options){
	console.log('Building Babel config...')
	const config = {
		presets: [
			'env',
			'stage-0',
		],
		plugins: [
			'transform-es2015-modules-commonjs',
			'syntax-dynamic-import',
			'dynamic-import-node',
			['transform-runtime', {
				polyfill: false,
				regenerator: true
			}]
		]
	}
	if(!options[`no-react`]){
		config.presets.push(`react`)
		if (!options['no-css']) {
			config.plugins.unshift([
				'styled-jsx/babel', {
					plugins: ['styled-jsx-plugin-postcss']
				}
			])
		}
	}
	return config
}

export default createConfig