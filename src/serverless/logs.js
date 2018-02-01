import { readFile } from 'fs-extra'
import { join } from 'path'

import spawn from '../spawn'
import getConfig from './get-config'

async function getFirstFunction(){
	let config = await getConfig()
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
	return await spawn(cmd, options)
}