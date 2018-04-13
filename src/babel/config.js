function createConfig(){
	const config = {
		presets: [
			'env',
			'stage-0',
			'react',
		],
		plugins: [
			[
				'styled-jsx/babel', {
					plugins: [ 'styled-jsx-plugin-postcss']
				}
			],
			"syntax-dynamic-import",
			"dynamic-import-node"
		]
	}
	return config
}

export default createConfig