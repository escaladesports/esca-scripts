import { spawn } from 'child-process-promise'

const defaultArgs = []
const defaultOptions = {
	shell: true,
	stdio: 'inherit',
}

export default async function (cmd, options, noExit){
	try{
		if(typeof cmd === 'object') cmd = cmd.join(' && ')
		if(options.yn) cmd.unshift('yn')
		const res = await spawn(cmd, defaultArgs, defaultOptions)
		return res
	}
	catch(err){
		if (!noExit){
			console.error(err)
			process.exit(1)
		}
	}
}