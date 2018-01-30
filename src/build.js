import webpack from './webpack-promise'
import defaultWebpackConfig from './webpack-config'

export default async function(options = {}) {
	options = {
		env: 'production',
		webpackConfig: {},
		...options
	}
	const webpackConfig = {
		...defaultWebpackConfig(options),
		...options.webpackConfig
	}
	let res = await webpack(webpackConfig)
}