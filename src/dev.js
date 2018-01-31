import webpack from 'webpack'
import Server from 'webpack-dev-server'
import opn from 'opn'
import { spawn } from 'child-process-promise'

export default function (config) {
	const compiler = webpack(config)
	const server = new Server(compiler, {
		stats: {
			colors: true
		}
	})
	server.listen(8080, 'localhost', () => {
		opn('http://localhost:8080')
	})
}