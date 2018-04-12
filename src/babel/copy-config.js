import { outputJson } from 'fs-extra'
import createConfig from './config'

async function copyConfig(){
	const config = createConfig()
	await outputJson('.babelrc', config)
}

export default copyConfig