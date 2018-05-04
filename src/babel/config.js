function createConfig(options){
	console.log('Building Babel config...')
	const config = {
		presets: [
			'env',
			'stage-0',
			'react',
		],
		plugins: [
			['styled-jsx/babel', {
				plugins: [ 'styled-jsx-plugin-postcss' ]
			}],
			'syntax-dynamic-import',
			'dynamic-import-node',
			['transform-runtime', {
				polyfill: false,
				regenerator: true
			}]
		]
	}

	return config
}

export default createConfig