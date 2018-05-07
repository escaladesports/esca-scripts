import { spawn } from 'child-process-promise'
import copyBabelConfig from './babel/copy-config'

async function runFile(options) {
	if (!options[`no-config`]) {
		await copyBabelConfig(options)
	}

	try {
		await spawn(`jest`, [], {
			shell: true,
			stdio: `inherit`
		})
	}
	catch(err){
		process.exit(1)
	}
}

export default runFile
