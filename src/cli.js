import meow from 'meow'
import webpack from './webpack'
import serve from './serve'
import test from './test'

const cli = meow(`
	Usage
		$ esca-scripts <command> <options>

	Commands
		$ build     Creates a distribution build
		$ dev       Opens a development server
		$ serve     Serves static content
		$ analyze   Analyze dependency sizes
		$ test      Runs mocha tests

	Options
		--input    Input path or file
		           Default: ./src/index.js
		--output   Output path or file
		           Default: [src path]/dist/[src name]
		--minify   Minifies JavaScript, default: true
		--env      Change environment variable, default: production
		--dir      Directory to serve if serving static content
		           Default: ./dist
		--open     Open development site in browser, default: true
		--port     Set to specify development site port
		           If not set, the first open port found will be used

	Project Options
		--browser      Set for a browser project
		--react        Set for a React component
		--gatsby       Set for a Gatsby project
		--mobx         Set if including MobX in your React or Gatsby project
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
		},
		dir: {
			type: 'string',
			default: './dist'
		},
		browser: {
			type: 'boolean'
		},
		open: {
			type: 'boolean',
			default: true
		},
		port: {
			type: 'string',
		}
	}
})

switch(cli.input[0]){
	case 'serve':
		serve(cli.flags)
		break
	case 'test':
		test()
		break
	case 'dev':
		webpack(cli, true)
		break
	default:
		webpack(cli)
}