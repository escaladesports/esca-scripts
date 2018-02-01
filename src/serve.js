import { spawn } from 'child_process'
import { join } from 'path'

export default function(options){
	let dir = options.dir || options.input || options.output
	dir = join(process.cwd(), dir)
	console.log(`Starting server at ${dir}`)
	spawn(`cd "${dir}" && static-server --open`, [], {
		shell: true,
		stdio: 'inherit',
	})
}