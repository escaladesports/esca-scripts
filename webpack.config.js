const path = require('path')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const plugins = []
if (process.env.ANALYZE) {
	plugins.push(new BundleAnalyzerPlugin({
		analyzerMode: 'server',
		openAnalyzer: true
	}))
}
else if (process.env.NODE_ENV !== 'production'){
	//plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = {
	entry: [
		'./src/index.js'
	],
	output: {
		path: path.join(__dirname, 'dist-webpack'),
		filename: 'index.js',
	},
	plugins: plugins,
	resolve: {
		extensions: ['.js', '.json']
	},
	module: {
		rules: [{
			test: /\.js?$/,
			use: [{
				loader: 'babel-loader'
			}],
			include: path.join(__dirname, '/')
		}]
	}
}
