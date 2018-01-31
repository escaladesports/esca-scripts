import { spawn } from 'child_process'

export default function(){
	spawn('mocha --require babel-core/register', [], {
		shell: true,
		stdio: 'inherit',
	})
}