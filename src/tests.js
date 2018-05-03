import { spawn } from 'child-process-promise'
import copyBabelConfig from './babel/copy-config'

async function runFile(options){
	await copyBabelConfig(options)
	spawn(`jest`, [], {
		shell: true,
		stdio: `inherit`
	})
}

export default runFile
