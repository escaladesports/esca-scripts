const path = require('path')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV
const plugins = []
let devtool = false

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
if (env === 'development'){
	plugins.push(new webpack.HotModuleReplacementPlugin())
	devtool = 'eval'
}

module.exports = {
	devtool: devtool,
	entry: [
		'./src/index.js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
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
	}
}
