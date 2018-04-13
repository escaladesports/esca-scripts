import { extname, resolve } from 'path'
import webpack from 'webpack'

function createConfig({ src, dist }){
	console.log(`Building webpack config...`)

	const cwd = process.cwd()
	if (extname(src) !== `.js`){
		//src = `./${src}/index.js`
		src = resolve(cwd, `./${src}/index.js`)
	}

	const config = {
		devtool: `eval-source-map`,
		entry: [ src ],
		output: {
			path: resolve(cwd, dist),
			filename: `index.js`,
			publicPath: `/${dist}/`
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '"production"'
				}
			}),
			new webpack.optimize.OccurrenceOrderPlugin(),
		],
		resolve: {
			extensions: [`.js`]
		},
		module: {
			rules: [{
				test: /\.js$/,
				use: [{
					loader: `babel-loader`
				}],
				include: resolve(cwd, `/`)
			}]
		}
	}

	console.log(JSON.stringify(config, null, 3))

	return config
}

export default createConfig