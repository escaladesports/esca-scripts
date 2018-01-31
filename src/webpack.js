import path from 'path'
import webpackConfig from './webpack-config'
import build from './build'
import devServer from './dev'

export default function (cli, dev) {
	let input = cli.flags.input || './src/index.js'
	input = input.split(',').map(str => str.trim())
	let output = cli.flags.output
	if (!output) {
		output = input[0].split('/')
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

	if(cli.input[0] === 'analyze'){
		cli.flags.analyze = true
	}
	else if(cli.input[0] === 'dev'){
		cli.flags.dev = true
	}

	const config = {
		...webpackConfig(cli.flags, input),
		entry: input,
		output: output
	}

	if (!dev) {
		build(config)
	}
	else{
		devServer(config)
	}
}