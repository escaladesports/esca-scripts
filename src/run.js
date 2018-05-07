import { spawn } from 'child-process-promise'
import copyBabelConfig from './babel/copy-config'

async function runFile(options) {
	if (!options[`no-config`]) {
		await copyBabelConfig(options)
	}
	console.log(`Running ${options.file}`)
	spawn(`babel-node ${options.file}`, [], {
		shell: true,
		stdio: `inherit`
	})
}

export default runFile
