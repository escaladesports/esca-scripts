import { remove } from 'fs-extra'
import { exec } from 'child-process-promise'
import copyBabelConfig from './copy-config'
import copyPostCSSConfig from '../postcss/copy-config'

async function buildBabel(options){
	console.log('Building with Babel...')
	await Promise.all([
		remove(options.dist),
		copyConfig(options),
		copyPostCSSConfig(options),
	])
	await exec(`babel ${options.src} --out-dir ${options.dist} --source-maps`)
}

export default buildBabel