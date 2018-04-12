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
			]
		]
	}
	return config
}

export default createConfig