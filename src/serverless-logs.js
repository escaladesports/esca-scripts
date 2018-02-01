import { readFile } from 'fs-extra'
import { join } from 'path'
import yaml from 'yaml'

import spawn from './spawn'

async function getFirstFunction(){
	let config = await readFile(join(process.cwd(), '/serverless.yml'))
	config = config.toString()
	console.log('CONFIG:', config)
	config = yaml.eval(config)
	console.log('YAML:', config)
	return Object.keys(config.functions)[0]
}

export default async function (options) {
	let cmd = `serverless logs --tail --stage ${options.stage}`

	let args = []
	if (args.start){
		args.push('--startTime', options.start)
	}
	args.push('--function', options.function || await getFirstFunction())

	cmd = `${cmd} ${args.join(' ')}`
	return await spawn(cmd)
}