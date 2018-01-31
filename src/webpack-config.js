import path from 'path'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import nodeExternals from 'webpack-node-externals'

export default function(options){
	const plugins = []
	const config = {
		plugins: plugins,
		resolve: {
			extensions: ['.js', '.jsx', '.json']
		},
		module: {
			rules: [{
				test: /\.js?$/,
				exclude: /node_modules/,
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
		}
	}

	// Environment specific plugins
	const env = options.env || process.env.NODE_ENV
	if (env === 'production') {
		plugins.push(new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}))
		if(options.minify){
			plugins.push(new UglifyJsPlugin())
		}
	}
	if (env === 'development') {
		plugins.push(new webpack.HotModuleReplacementPlugin())
		config.devtool = 'eval'
	}

	// Option specific plugins
	if (options.analyze) {
		plugins.push(new BundleAnalyzerPlugin())
		delete config.rules
	}
	if (options.cli) {
		plugins.push(new webpack.BannerPlugin({
			banner: '#!/usr/bin/env node',
			raw: true
		}))
	}
	if (!options.analyze && !options.browser) {
		config.target = 'node'
		config.externals = [nodeExternals()]
	}
	if (options.browser) {
		console.log('Building for browser...')
		plugins.push(
			new webpack.optimize.ModuleConcatenationPlugin(),
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false,
			})
		)
	}

	return config
}
