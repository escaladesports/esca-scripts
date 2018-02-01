import meow from 'meow'

import help from './help'
import webpack from './webpack'
import serve from './serve'
import test from './test'
import serverlessDeploy from './serverless-deploy'
import getStage from './get-stage'

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
		},
		serverless: {
			type: 'boolean'
		},
		stage: {
			type: 'string',
			default: 'staging',
		},
		yn: {
			type: 'boolean'
		}
	}
})

if(cli.flags.serverless){
	options.stage = getStage(options.stage)
}

switch(cli.input[0]){
	case 'serve':
		serve(cli.flags)
		break
	case 'test':
		test(cli.flags)
		break
	case 'dev':
		webpack(cli, true)
		break
	case 'deploy':
		if(cli.flags.serverless){
			serverlessDeploy(cli.flags)
		}
		break
	default:
		webpack(cli)
}