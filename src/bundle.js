import { spawn } from 'child-process-promise'
import { remove, pathExists } from 'fs-extra'
import { extname, parse } from 'path'
import copyBabelConfig from './babel/copy-config'
import copyPostCSSConfig from './postcss/copy-config'
import getDist from './get-dist'

async function getSrc() {
	if (await pathExists(`dev`)){
		return `dev`
	}
	if (await pathExists(`src`)){
		return `src`
	}
	return false
}

async function bundle(options){
	let args = []
	if (!options.src){
		options.src = await getSrc()
		if (!options.src){
			console.error(`No src directory found`)
			process.exit(1)
		}
		console.log(`Found source directory`)
	}
	if (!extname(options.src)) {
		if (await pathExists(`${options.src}/index.html`)) {
			console.log(`Found index.html file`)
			options.src = `${options.src}/index.html`
		}
		else if (await pathExists(`${options.src}/index.js`)) {
			console.log(`Found index.js file`)
			options.src = `${options.src}/index.js`
		}
	}
	if (!options.dist) {
		options.dist = await getDist(options.src)
	}
	args.push(`--out-dir`, `"${options.dist}"`)
	let promises = [
		remove(options.dist)
	]
	if (!options[`no-config`]) {
		promises.push(
			copyBabelConfig(options),
			copyPostCSSConfig(options)
		)
	}
	await Promise.all(promises)
	spawn(`parcel build ${options.src}`, args, {
		shell: true,
		stdio: `inherit`
	})
}

export default bundle
