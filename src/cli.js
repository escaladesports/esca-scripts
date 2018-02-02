import meow from 'meow'

import prompt from './prompt'
import pkg from '../package.json'
import help from './help'
import webpack from './webpack'
import serve from './serve'
import test from './test'
import reset from './reset'
import preventPush from './prevent-master-push'
import getStage from './serverless/get-stage'
import serverlessDeploy from './serverless/deploy'
import serverlessTest from './serverless/test'
import serverlessLogs from './serverless/logs'
import serverlessDev from './serverless/dev'
import serverlessBuild from './serverless/build'

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
			default: 'staging'
		},
		prompt: {
			type: 'boolean'
		},
		start: {
			type: 'string'
		},
		function: {
			type: 'string'
		},
		component: {
			type: 'boolean'
		}
	}
})

async function operation() {
	const input = cli.input[0]
	if(cli.flags.prompt || input === 'prompt'){
		await prompt()
	}
	if (cli.flags.serverless) {
		cli.flags.stage = getStage(cli.flags.stage)
		switch (input) {
			case 'serve':
			case 'dev':
				return serverlessDev(cli.flags)
			case 'test':
				return serverlessTest(cli.flags)
			case 'deploy':
				return serverlessDeploy(cli.flags)
			case 'logs':
				return serverlessLogs(cli.flags)
			case 'build':
				return serverlessBuild(cli.flags)
		}
	}

	switch (input) {
		case 'serve':
			return serve(cli.flags)
		case 'test':
			return test(cli.flags)
		case 'dev':
			return webpack(cli, true)
		case 'build':
		case 'analyze':
			return webpack(cli)
		case 'reset':
			return reset(cli.flags)
		case 'prevent-push':
			return preventPush()
	}
}
operation()