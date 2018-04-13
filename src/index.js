import program from 'subcommander'
import buildBabel from './babel/build'
import pkg from '../package.json'

program.command(`version`, {
		desc: `Display ${pkg.name} version`,
		callback: () => {
			console.log(pkg.version)
		}
	})

program.command('build', {
		desc: `Build distributable files`,
		callback: buildBabel
	})
	.option('src', {
		default: 'src'
	})
	.option('dist', {
		default: 'dist'
	})

program.parse()

