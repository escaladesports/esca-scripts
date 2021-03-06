import { spawn } from 'child-process-promise'
import { pathExists } from 'fs-extra'
import copyBabelConfig from './babel/copy-config'
import copyPostCSSConfig from './postcss/copy-config'

async function getSrc() {
	if (await pathExists(`dev`)){
		return `dev`
	}
	if (await pathExists(`src`)){
		return `src`
	}
	return false
}

async function dev(options){
	let args = []
	if (!options.src){
		options.src = await getSrc()
		if (!options.src){
			console.error(`No src directory found`)
			process.exit(1)
		}
		console.log(`Found source directory`)
	}
	if (!options.dist){
		if (options.src === `src`){
			options.dist = `dist`
		}
		else{
			options.dist = `dist-${options.src}`
		}
	}
	args.push(`--out-dir`, `"${options.dist}"`)
	if (await pathExists(`${options.src}/index.html`)){
		console.log(`Found index.html`)
		options.src = `${options.src}/index.html`
		args.push(`--open`)
	}
	if (!options[`no-config`]) {
		await Promise.all([
			copyBabelConfig(options),
			copyPostCSSConfig(options),
		])
	}
	if (options[`no-hmr`]){
		args.push(`--no-hmr`)
	}
	console.log(`Running dev in ${options.src}`)
	const cmd = `parcel serve ${options.src}`
	spawn(cmd, args, {
		shell: true,
		stdio: `inherit`
	})
}

export default dev
