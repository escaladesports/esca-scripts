import { remove } from 'fs-extra'
import { exec } from 'child-process-promise'
import copyBabelConfig from './babel/copy-config'
import copyPostCSSConfig from './postcss/copy-config'
import getDist from './get-dist'

async function buildBabel(options){
	console.log('Building with Babel...')
	if (!options.dist) {
		options.dist = await getDist(options.src)
	}
	let promises = []
	if (!options[`no-config`]) {
		if(!options[`no-remove`]){
			promises.push(remove(options.dist))
		}
		promises.push(
			copyBabelConfig(options),
			copyPostCSSConfig(options)
		)
		await Promise.all(promises)
	}
	await exec(`NODE_ENV=production babel ${options.src} --out-dir ${options.dist} --source-maps`)
}

export default buildBabel