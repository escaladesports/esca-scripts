import { outputJson } from 'fs-extra'
import createConfig from './config'

async function copyConfig(options){
	console.log('Copying Babel config...')
	const config = createConfig(options)
	await outputJson('.babelrc', config, { spaces: '\t' })
}

export default copyConfig