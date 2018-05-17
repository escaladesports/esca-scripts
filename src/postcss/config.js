function createConfig(options) {
	console.log(`Building PostCSS config...`)
	const config = {
		plugins: {
			'postcss-import': {},
			'postcss-cssnext': {},
			'postcss-nested': {},
			'lost': {},
		},
	}
	return config
}

export default createConfig