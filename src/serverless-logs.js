import { readFile } from 'fs-extra'
import { join } from 'path'
import yaml from 'yaml'

import spawn from './spawn'

async function getFirstFunction(){
	let config = await readFile(join(process.cwd(), '/serverless.yml'))
	console.log('CONFIG:', config)
	config = yaml.eval(config)
	console.log('YAML:', config)
	return Object.keys(config.functions)[0]
}

export default async function (options) {
	let cmd = `serverless logs --tail --stage ${options.stage}`

	let options = []
	if(options.start){
		options.push('--startTime', options.start)
	}
	options.push('--function', options.function || await getFirstFunction())

	cmd = `${cmd} ${options.join(' ')}`
	return await spawn(cmd)
}