import { outputJson } from 'fs-extra'
import createConfig from './config'

async function copyConfig(){
	console.log('Copying Babel config...')
	const config = createConfig()
	await outputJson('.babelrc', config, { spaces: '\t' })
}

export default copyConfig