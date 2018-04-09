import {
	outputJson,
	ensureFile,
	ensureDir,
	pathExists,
} from 'fs-extra'

import BabelConfig from './babel-config'
import spawn from './spawn'
import postcssConfig from './postcss-config'

export default async function (cli){

	let input = cli.flags.input || './src/index.js'
	input = input.split(',').map(str => str.trim())
	let output = cli.flags.output

	if (!output) {
		output = input[0].split('/')
		for (let i = output.length; i--;) {
			if (output[i] === 'src') {
				output[i] = 'dist'
				break
			}
		}
		output = output.join('/')
	}

	const config = BabelConfig(cli.flags)

	const flags = []
	if (cli.flags.multiple){
		flags.push(`--out-dir`, `"${output}"`)
		await ensureDir(output)
	}
	else{
		flags.push(`--out-file`, `"${output}"`)
		await ensureFile(output)
	}
	flags.push(`--source-maps`)

	await outputJson(`.babelrc`, config, { spaces: '\t' })


	if (cli.flags.react) {
		if (!await pathExists('.postcssrc')) {
			await outputJson('.postcssrc', postcssConfig, { spaces: '\t' })
		}
	}

	console.log(`Building with Babel...`)
	const cmd = `babel "${input}" ${flags.join(' ')}`
	console.log(cmd)
	await spawn(cmd, cli.flags)
}