import meow from 'meow'
import path from 'path'
import webpack from 'webpack'

import webpackConfig from './webpack-config'

const cli = meow(`
	Usage
		$ esca-scripts <command> <options>

	Commands
		$ build     Creates a distribution build
		$ dev       Opens a development server

	Options
		--input    Input path or file
		           Default: ./src/index.js
		--output   Output path or file
		           Default: [src path]/dist/[src name]
		--minify   Minifies JavaScript, default: true

	Project Options
		--react        Set for a React component
		--mobx         Set if including MobX in your React or Gatsby project
		--gatsby       Set for a Gatsby project
		--cli          Set for a CLI project
`, {
	flags: {
		banner: {
			type: 'string'
		},
		cli: {
			type: 'boolean'
		},
		env: {
			type: 'string',
			default: 'production'
		},
		minify: {
			type: 'boolean',
			default: true
		}
	}
})

let input = cli.flags.input || './src/index.js'
let output = cli.flags.output
if(!output){
	output = input.split('/')
	for(let i = output.length; i--;){
		if(output[i] === 'src'){
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
	if(err){
		console.error(err)
		process.exit(1)
	}
})