function createConfig(options) {
	console.log(`Building PostCSS config...`)
	const config = {
		plugins: {
			'postcss-nested': {},
			'lost': {},
			'css-mqpacker': {},
		},
	}
	return config
}

export default createConfig