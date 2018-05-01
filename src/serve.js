import Server from 'static-server'
import getPort from 'get-port'

async function startServer(options){
	console.log(`Starting server pointed to ${options.dir}`)
	options = {
		open: true,
		...options
	}
	if(options.dir){
		options.rootPath = options.dir
		delete options.dir
	}
	if(!options.port){
		options.port = await getPort({ port: 3000 })
	}
	const server = new Server(options)
	server.start(() => console.log(`Started server on port ${server.port}`))
}

export default startServer