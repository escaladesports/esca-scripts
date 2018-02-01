import { readFile } from 'fs-extra'
import { load } from 'js-yaml'
import { join } from 'path'

export default async function () {
	let config = await readFile(join(process.cwd(), '/serverless.yml'))
	config = config.toString()
	config = load(config)
	return config
}