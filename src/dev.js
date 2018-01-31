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

	const port = await getPortPromise()
	console.log(`Starting dev server on port ${port}...`)
	server.listen(port, 'localhost', () => {
		console.log(`Running dev server on port ${port}`)
		if (options.open) {
			opn(`http://localhost:${port}`)
		}
	})
}