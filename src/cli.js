import meow from 'meow'

import help from './help'
import webpack from './webpack'
import serve from './serve'
import test from './test'
import serverlessDeploy from './serverless-deploy'
import serverlessTest from './serverless-test'
import serverlessLogs from './serverless-logs'
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
		},
		start: {
			type: 'string',
		},
		function: {
			type: 'string',
		},
		start: {
			type: 'string'
		}
	}
})

if(cli.flags.serverless){
	cli.flags.stage = getStage(cli.flags.stage)
}

switch(cli.input[0]){
	case 'serve':
		serve(cli.flags)
		break
	case 'test':
		if(cli.flags.serverless){
			serverlessTest(cli.flags)
		}
		else {
			test(cli.flags)
		}
		break
	case 'dev':
		webpack(cli, true)
		break
	case 'deploy':
		if(cli.flags.serverless){
			serverlessDeploy(cli.flags)
		}
		break
	case 'logs':
		serverlessLogs(cli.flags)
		break
	default:
		webpack(cli)
}