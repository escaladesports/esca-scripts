import program from 'subcommander'
import runBabel from './babel/run'
import pkg from '../package.json'

program.command(`version`, {
		desc: `Display ${pkg.name} version`,
		callback: () => {
			console.log(pkg.version)
		}
	})

program.command('build', {
		desc: `Build distributable files`,
		callback: runBabel
	})
	.option('src', {
		default: 'src'
	})
	.option('dist', {
		default: 'dist'
	})

program.parse()

