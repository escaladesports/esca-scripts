import { readFile } from 'fs-extra'
import { join } from 'path'
import { load } from 'js-yaml'

import spawn from './spawn'

async function getFirstFunction(){
	let config = await readFile(join(process.cwd(), '/serverless.yml'))
	config = config.toString()
	config = load(config)
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