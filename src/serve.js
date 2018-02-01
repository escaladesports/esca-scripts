import { join } from 'path'

import spawn from './spawn'

export default function(options){
	let dir = options.dir || options.input || options.output
	dir = join(process.cwd(), dir)
	console.log(`Starting server at ${dir}`)
	spawn(`cd "${dir}" && static-server --open`)
}