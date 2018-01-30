import webpack from './webpack-promise'
import defaultWebpackConfig from './webpack-config'

async function build(options = {}) {
	options = {
		env: 'production',
		...options
	}
	const webpackConfig = {
		...defaultWebpackConfig(options.env)
	}
	try {
		await webpack(config)
	}
	catch(err){
		console.error(err)
		process.exit(1)
	}
}

build()