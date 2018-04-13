import { outputJson } from 'fs-extra'
import { exec } from 'child-process-promise'
import copyConfig from './copy-config'

async function buildBabel(options){
	console.log('Building with Babel...')
	await copyConfig(options)
	await exec(`babel ${options.src} --out-dir ${options.dist}`)
}

export default buildBabel