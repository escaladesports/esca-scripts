
import meow from 'meow'
import path from 'path'

import build from './build'

const cli = meow(`
	Usage
		$ esca-scripts <command> <options>

	Commands
		$ build     Creates a distribution build
		$ dev       Opens a development server

	Options
		--input, -i    Input path or file
		--output, -o   Output path or file

	Project Options
		--react        Set for a React component
		--javascript   Set for a JS-only module
		--mobx         Set if including MobX in your React or Gatsby project
		--gatsby       Set for a Gatsby project
`, {
	flags: {
		javascript: {
			type: 'boolean'
		}
	}
})

console.log('CWD:', process.cwd())
console.log('INPUT:', cli.input)
console.log('FLAGS:', cli.flags)

let input = cli.flags.input || './src/index.js'
let output = cli.flags.output || './dist/index.js'
output = path.join(process.cwd(), output)
output = path.parse(output)
output = {
	path: output.dir,
	filename: output.base
}

build({
	webpackConfig: {
		entry: input,
		output: output
	}
})
