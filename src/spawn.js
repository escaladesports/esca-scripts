import { spawn } from 'child-process-promise'

const defaultArgs = []
const defaultOptions = {
	shell: true,
	stdio: 'inherit',
}

export default async function (cmd, exit, args = defaultArgs, options = defaultOptions){
	try{
		const res = await spawn(cmd, defaultArgs, defaultOptions)
		return res
	}
	catch(err){
		if(exit){
			console.error(err)
			process.exit(1)
		}
	}
}