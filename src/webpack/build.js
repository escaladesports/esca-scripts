import { remove } from 'fs-extra'
import webpack from 'webpack'
import Config from './config'

function webpackPromise(config){
	return new Promise((resolve, reject) => {
		console.log(`Building with webpack...`)
		webpack(config, err => {
			if(err){
				console.error(err)
				process.exit(1)
			}
			console.log(`Built with webpack`)
			resolve()
		})
	})
}

async function webpackBuild(options) {
	await remove(options.dist)
	const config = Config(options)
	await webpackPromise(config)
}

export default webpackBuild