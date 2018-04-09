import { join, parse } from 'path'
import glob from 'globby'
import clone from 'clone'

import webpackConfig from './webpack-config'
import build from './webpack-build'
import devServer from './dev'
import postcssConfig from './postcss-config'

export default async function startWebpack(cli, dev) {
	let input = cli.flags.input || './src/index.js'
	input = input.split(',').map(str => str.trim())
	let output = cli.flags.output

	// If multiple inputs
	if (cli.flags.multiple) {
		input = await glob(input)
		await Promise.all(input.map(input => {
			let singleCli = clone(cli)
			delete singleCli.flags.multiple
			singleCli.flags.input = input
			let fileName = parse(input).base
			singleCli.flags.output = join(output, fileName)
			return startWebpack(singleCli, dev)
		}))
		return
	}

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
	output = join(process.cwd(), output)
	output = parse(output)
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
		...webpackConfig(cli.flags, input, output)
	}

	if (!dev) {
		build(config)
	}
	else{
		devServer(config, cli.flags)
	}
}