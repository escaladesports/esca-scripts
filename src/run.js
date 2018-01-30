import path from 'path'
import webpack from 'webpack'
import webpackConfig from './webpack-config'

export default function (cli) {
	let input = cli.flags.input || './src/index.js'
	let output = cli.flags.output
	if (!output) {
		output = input.split('/')
		for (let i = output.length; i--;) {
			if (output[i] === 'src') {
				output[i] = 'dist'
				break
			}
		}
		output = output.join('/')
	}
	output = path.join(process.cwd(), output)
	output = path.parse(output)
	output = {
		path: output.dir,
		filename: output.base
	}

	webpack({
		...webpackConfig(cli.flags),
		entry: input,
		output: output
	}, err => {
		if (err) {
			console.error(err)
			process.exit(1)
		}
	})
}