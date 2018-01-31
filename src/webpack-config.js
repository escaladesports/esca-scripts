import path from 'path'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import nodeExternals from 'webpack-node-externals'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReloadHtmlPlugin from 'reload-html-webpack-plugin'

export default function(options, input){
	const plugins = []
	const babelPresets = [
		'es2015',
		'stage-3',
	]
	const babelPlugins = []
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
						presets: babelPresets,
						plugins: babelPlugins,
					},
				}],
				include: path.join(process.cwd(), '/'),
			}, {
				test: /\.html?$/,
				use: {
					loader: 'html-loader'
				}
			}]
		}
	}



	// Environment specific plugins
	let env = options.env || process.env.NODE_ENV
	if(options.dev) env = 'development'
	if (env === 'production') {
		console.log('Building production environment...')
		plugins.push(new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}))
		if(options.minify){
			plugins.push(new UglifyJsPlugin())
		}
	}
	if (env === 'development') {
		console.log('Building development environment...')
		plugins.push(new webpack.HotModuleReplacementPlugin())
		input.forEach(input => {
			if (path.extname(input) === '.html') {
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
		config.externals = [ nodeExternals() ]
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
	if(options.react){
		console.log('Building for React...')
		babelPresets.length = 0
		babelPresets.push(
			'react',
			'stage-3'
		)
		babelPlugins.length = 0
		babelPlugins.push(
			["styled-jsx/babel", {
				"plugins": [
					"styled-jsx-plugin-postcss"
				]
			}],
			["transform-react-remove-prop-types", {
				"mode": "wrap"
			}]
		)
	}

	return config
}
