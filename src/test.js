import { spawn } from 'child-process-promise'
import { babel } from '../package.json'
import { pathExists, outputJson, remove } from 'fs-extra'

export default async function(){
	let rcExists = await pathExists('.babelrc')
	if(!rcExists){
		await outputJson('.babelrc', babel)
	}
	try {
		await spawn('mocha --require babel-core/register', [], {
			shell: true,
			stdio: 'inherit',
		})
	}
	catch(err){}
	if(!rcExists){
		await remove('.babelrc')
	}
}