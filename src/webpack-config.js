import { extname, join } from 'path'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import nodeExternals from 'webpack-node-externals'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReloadHtmlPlugin from 'reload-html-webpack-plugin'

import BabelConfig from './babel-config'

export default function(options, input, output){
	console.log(`Building Webpack config...`)
	const plugins = []
	const babelConfig = BabelConfig(options)
	const config = {
		entry: input,
		output,
		plugins,
		resolve: {
			extensions: ['.js', '.jsx', '.json']
		},
		module: {
			rules: [
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					use: [{
						loader: 'babel-loader',
						options: babelConfig,
					}],
					include: join(process.cwd(), '/'),
				},
				{
					test: /\.html?$/,
					use: {
						loader: 'html-loader'
					}
				},
			]
		}
	}

	// Environment specific plugins
	let env = options.env || process.env.NODE_ENV
	if(options.dev) env = 'development'
	if (env === 'production') {
		console.log(`Building Webpack config for production environment...`)
		plugins.push(new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}))
		if(options.minify){
			plugins.push(new UglifyJsPlugin())
		}
	}
	if (env === 'development') {
		console.log(`Building Webpack config for development environment...`)
		plugins.push(new webpack.HotModuleReplacementPlugin())
		input.forEach(input => {
			if (extname(input) === '.html') {
				plugins.push(new HtmlWebpackPlugin({
					template: input
				}))
			}
		})
		plugins.push(new ReloadHtmlPlugin())
		config.devtool = 'eval'
		options.devServer = {
			hot: true,
			contentBase: 'dev',
			publicPath: '/public/',
		}
	}

	// Option specific plugins
	if (options.analyze) {
		console.log(`Building Webpack config for analyzation...`)
		plugins.push(new BundleAnalyzerPlugin())
		delete config.rules
	}
	if (options.cli) {
		console.log(`Building Webpack config for CLI...`)
		plugins.push(new webpack.BannerPlugin({
			banner: '#!/usr/bin/env node',
			raw: true
		}))
	}
	if (!options.analyze && !options.browser) {
		console.log(`Building Webpack config for Node.js...`)
		config.target = 'node'
		config.externals = [ nodeExternals() ]
	}
	if (options.browser) {
		console.log(`Building Webpack config for browser...`)
		plugins.push(
			new webpack.optimize.ModuleConcatenationPlugin(),
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false,
			})
		)
	}
	if (options.component) {
		console.log(`Building Webpack config for component...`)
		config.output.libraryTarget = 'umd'
		if(options.name){
			console.log(`Building UMD component with name: ${options.name}`)
			config.output.library = options.name
			config.output.umdNamedDefine = true
		}
		else {
			config.output.umdNamedDefine = false
		}
	}

	return config
}
