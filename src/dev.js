import { spawn } from 'child-process-promise'
import { pathExists } from 'fs-extra'

async function getSrc() {
	if (await pathExists(`dev`)){
		return `dev`
	}
	if (await pathExists(`src`)){
		return `src`
	}
	return false
}

async function dev({ src, dist }){
	let args = []
	if(!src){
		src = await getSrc()
		if(!src){
			console.error(`No src directory found`)
			process.exit(1)
		}
		console.log(`Found source directory`)
	}
	if(!dist){
		if(src === `src`){
			dist = `dist`
		}
		else{
			dist = `dist-${src}`
		}
	}
	args.push(`--out-dir`, `"${dist}"`)
	if(await pathExists(`${src}/index.html`)){
		console.log(`Found index.html`)
		args.push(`--open`)
	}
	spawn(`parcel ${src}`, args, {
		shell: true,
		stdio: `inherit`
	})
}

export default dev
