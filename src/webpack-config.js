import path from 'path'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import nodeExternals from 'webpack-node-externals'

export default function(options = {}){

	const env = options.env || process.env.NODE_ENV
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

	if (options.cli) {
		plugins.push(new webpack.BannerPlugin({
			banner: '#!/usr/bin/env node',
			raw: true
		}))
	}

	return {
		devtool: devtool,
		target: 'node',
		externals: [nodeExternals()],
		entry: [
			'./src/index.js'
		],
		output: {
			path: path.join(process.cwd(), '../dist'),
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
				include: path.join(process.cwd(), '/'),
			}]
		},
	}

}
