import exeq from 'exeq'
import { join } from 'path'

export default function(options){
	let dir = options.dir || options.input || options.output
	dir = join(process.cwd(), dir)
	exeq(`cd "${dir}" && static-server --open`)
}