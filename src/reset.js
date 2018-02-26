import { basename } from 'path'
import {
	readJson,
	outputJson,
	remove,
	outputFile,
	readFile,
	pathExists,
} from 'fs-extra'

import spawn from './spawn'
import getConfig from './serverless/get-config'

function recursiveReset(options, obj){
	for(let i in obj){
		if(i === 'dependencies' || i === 'devDependencies'){
			continue
		}
		if(typeof obj[i] === 'object'){
			obj[i] = recursiveReset(options, obj[i])
		}
		else{
			obj[i] = obj[i].replace(options.oldName, options.name)
		}
	}
	return obj
}

async function resetPackage(options) {
	if (!await pathExists('package.json')){
		return console.log('No package.json file found')
	}
	console.log('Resetting package.json file...')
	const pkg = await readJson('package.json')
	if (pkg.name) {
		options.oldName = pkg.name
		if(!options.name){
			options.name = basename(process.cwd())
			recursiveReset(options, pkg)
		}
		pkg.name = options.name
		pkg.keywords = options.name.split(`-`)
		recursiveReset(options, pkg)
	}
	pkg.version = options.version || '0.0.0'
	await outputJson('package.json', pkg, { spaces: 2 })
}

async function resetGit(options) {
	if (!await pathExists('.git')){
		return console.log('No .git directory found')
	}
	console.log('Resetting git...')
	await remove('.git')
	await spawn([
		`git init`,
		`git add .`,
		`git commit -m "Initial commit"`,
	])
}

async function resetServerless(options){
	if(!await pathExists('serverless.yml')){
		return console.log('No serverless.yml file found')
	}
	console.log('Resetting serverless config...')
	let config = await readFile('serverless.yml')
	config = config.toString()
	config = config.split('\n')
	for(let i = 0; i < config.length; i++){
		let line = config[i]
		if (line.indexOf('service:') === 0){
			config[i] = `service: ${options.name || basename(process.cwd())}`
			break
		}
	}
	config = config.join('\n')
	await outputFile('serverless.yml', config)
}

export default async function(options){
	await Promise.all([
		resetPackage(options),
		resetServerless(options),
	])
	await resetGit(options)
}