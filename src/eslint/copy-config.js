import { outputJson } from 'fs-extra'
import createConfig from './config'

async function copyConfig(options){
	console.log(`Copying ESLint config...`)
	const config = createConfig(options)
	await outputJson(`.eslint`, config, { spaces: '\t' })
}

export default copyConfig