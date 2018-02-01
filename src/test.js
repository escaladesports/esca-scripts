import { pathExists, outputJson } from 'fs-extra'

import spawn from './spawn'
import { babel } from '../package.json'

export default async function(options){
	if (!await pathExists('.babelrc')) {
		await outputJson('.babelrc', babel, { spaces: '\t' })
	}
	try {
		await spawn('mocha --require babel-core/register', options)
	}
	catch(err){}
}