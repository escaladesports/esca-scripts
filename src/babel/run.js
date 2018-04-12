import { outputJson } from 'fs-extra'
import { exec } from 'child-process-promise'
import createConfig from './config'

async function runBabel(){
	const config = createConfig()
	await outputJson('babelrc', config)
	await exec('babel src --out-dir dist')
}

export default runBabel