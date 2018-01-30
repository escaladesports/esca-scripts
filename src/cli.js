import meow from 'meow'
import run from './run'

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
		--env      Change environment variable, default: production

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

run(cli)