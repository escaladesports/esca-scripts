import path from 'path'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

export default function(env){

	const env = env || process.env.NODE_ENV
	const plugins = []
	let devtool = false

	console.log(`Webpack building in ${env} environment...`)

	if (env === 'production' || env === 'analyze') {
		plugins.push(
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new UglifyJsPlugin(),
		)
	}
	if (env === 'analyze') {
		plugins.push(new BundleAnalyzerPlugin({
			analyzerMode: 'server',
			openAnalyzer: true
		}))
	}
	if (env === 'development') {
		plugins.push(new webpack.HotModuleReplacementPlugin())
		devtool = 'eval'
	}

	return {
		devtool: devtool,
		entry: [
			'./src/index.js'
		],
		output: {
			path: path.join(__dirname, '../dist'),
			filename: 'index.js',
		},
		plugins: plugins,
		resolve: {
			extensions: ['.js', '.jsx', '.json']
		},
		module: {
			rules: [{
				test: /\.js?$/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							'es2015',
							'stage-3',
						]
					},
				}],
				include: path.join(__dirname, '/')
			}]
		},
	}

}
