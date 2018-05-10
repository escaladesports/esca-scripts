import { join } from 'path'
import { outputJson } from 'fs-extra'
import createConfig from './config'

async function copyConfig(options){
	console.log('Copying Babel config...')
	const config = createConfig(options)
	let configPath = join(process.cwd(), `.babelrc`)
	console.log(configPath)
	await outputJson(configPath, config, { spaces: '\t' })
}

export default copyConfig