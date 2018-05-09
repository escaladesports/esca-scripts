import { outputJson } from 'fs-extra'
import createConfig from './config'

async function copyConfig(options){
	if(options['no-css']) return
	console.log(`Copying PostCSS config...`)
	const config = createConfig(options)
	await outputJson(`.postcssrc`, config, { spaces: '\t' })
}

export default copyConfig