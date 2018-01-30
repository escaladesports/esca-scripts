import webpack from './webpack-promise'
import defaultWebpackConfig from './webpack-config'

export default async function(options = {}) {
	options = {
		env: 'production',
		webpackConfig: {},
		...options
	}
	const webpackConfig = {
		...defaultWebpackConfig(options.env),
		...options.webpackConfig
	}
	try {
		await webpack(webpackConfig)
	}
	catch(err){
		console.error(err)
		process.exit(1)
	}
}