#!/usr/bin/env node
import program from 'subcommander'
import buildBabel from './babel/build'
import buildWebpack from './webpack/build'
import dev from './dev'
import { exec } from 'child-process-promise'
import pkg from '../package.json'

program.command(`version`, {
		desc: `Display ${pkg.name} version`,
		callback: () => console.log(pkg.version)
	})

program.command(`build`, {
		desc: `Build distributable files`,
		callback: options => {
			if(!options.bundle){
				return buildBabel(options)
			}
			buildWebpack(options)
		},
	})
	.option(`src`, {
		default: `src`,
		desc: `The source directory of your project`,
	})
	.option(`dist`, {
		default: `dist`,
		desc: `The distribution directory your project will compile to`,
	})
	.option(`bundle`, {
		flag: true,
		desc: `Bundles your project into a single file`,
	})

program.command(`dev`, {
		desc: `Live develop in browser`,
		callback: dev,
	})
	.option(`src`, {
		desc: `The source directory or file of your project`,
	})
	.option(`dist`, {
		desc: `The distribution directory of your project`,
	})

program.parse()

