import { spawn } from 'child-process-promise'
import copyBabelConfig from './babel/copy-config'

async function runFile(options){
	await copyBabelConfig(options)

	let res = spawn(`jest`, [], {
		shell: true,
		stdio: `inherit`
	})
	if (res.stderr){
		console.error(res.stderr)
		process.exit(1)
	}
}

export default runFile
