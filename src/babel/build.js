import { remove } from 'fs-extra'
import { exec } from 'child-process-promise'
import copyConfig from './copy-config'

async function buildBabel(options){
	console.log('Building with Babel...')
	await Promise.all([
		remove(options.dist),
		copyConfig(options),
	])
	await exec(`babel ${options.src} --out-dir ${options.dist} --source-maps`)
}

export default buildBabel