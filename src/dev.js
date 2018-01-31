import webpack from 'webpack'
import Server from 'webpack-dev-server'
import opn from 'opn'
import { spawn } from 'child-process-promise'
import { getPortPromise } from 'portfinder'

export default async function (config, options) {
	const compiler = webpack(config)
	const server = new Server(compiler, {
		stats: {
			colors: true
		}
	})

	if(!options.port){
		options.port = await getPortPromise()
	}
	console.log(`Starting dev server on port ${options.port}...`)
	server.listen(options.port, 'localhost', () => {
		console.log(`Running dev server on port ${options.port}`)
		if (options.open) {
			opn(`http://localhost:${options.port}`)
		}
	})
}