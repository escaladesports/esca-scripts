import { spawn } from 'child-process-promise'

export default async function(){
	try {
		await spawn('yn', [], {
			shell: true,
			stdio: 'inherit',
		})
	}
	catch (err) {
		process.exit(1)
	}
}