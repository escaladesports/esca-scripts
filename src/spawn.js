import { spawn } from 'child-process-promise'

const defaultArgs = []
const defaultOptions = {
	shell: true,
	stdio: 'inherit',
}

export default async function (cmd, args = defaultArgs, options = defaultOptions){
	return await spawn(cmd, args, options)
}