import meow from 'meow'

import help from './help'
import webpack from './webpack'
import serve from './serve'
import test from './test'

const cli = meow(help, {
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