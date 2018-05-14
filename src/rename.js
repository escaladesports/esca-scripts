import { basename } from 'path'
import {
	readFile,
	readJson,
	outputJson,
	outputFile,
	pathExists,
} from 'fs-extra'


function recursiveReset(options, obj) {
	for (let i in obj) {
		if (i === `dependencies` || i === `devDependencies`) {
			continue
		}
		if (typeof obj[i] === `object`) {
			obj[i] = recursiveReset(options, obj[i])
		}
		else {
			obj[i] = obj[i].replace(options.oldName, options.name)
		}
	}
	return obj
}

async function renamePackage(options) {
	if (!await pathExists(`package.json`)) {
		return console.log(`No package.json file found`)
	}
	console.log(`Renaming in package.json file...`)
	const pkg = await readJson(`package.json`)
	if (pkg.name) {
		options.oldName = pkg.name
		pkg.name = options.name
		recursiveReset(options, pkg)
	}
	if(pkg.version){
		pkg.version = `0.0.0`
	}
	await outputJson(`package.json`, pkg, { spaces: 2 })
}

async function renameServerless(options) {
	if (!await pathExists(`serverless.yml`)) {
		return console.log(`No serverless.yml file found`)
	}
	console.log(`Renaming in serverless config...`)
	let config = await readFile(`serverless.yml`)
	config = config.toString()
	config = config.split(`\n`)
	for (let i = 0; i < config.length; i++) {
		let line = config[i]
		if (line.indexOf(`service:`) === 0) {
			config[i] = `service: ${options.name || basename(process.cwd())}`
			break
		}
	}
	config = config.join(`\n`)
	await outputFile(`serverless.yml`, config)
}

async function rename(options) {
	if (!options.name) {
		options.name = basename(process.cwd())
	}
	await Promise.all([
		renamePackage(options),
		renameServerless(options),
	])
}

export default rename
