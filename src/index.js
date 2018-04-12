import program from 'subcommander'
import babelRun from './babel/run'
import pkg from '../package.json'

program.command(`version`, {
		desc: `Display ${pkg.name} version`,
		callback: () => {
			console.log(pkg.version)
		}
	})

program.command('build', {
		desc: `Build distributable files`,
		callback: () => {
			console.log(`Building...`)
			babelRun()
		}
	})

program.parse()
