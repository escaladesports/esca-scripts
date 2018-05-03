#!/usr/bin/env node
import program from 'subcommander'
import { exec } from 'child-process-promise'

import { name, version } from '../package.json'
import build from './build'
import bundle from './bundle'
import dev from './dev'
import serve from './serve'
import run from './run'
import rename from './rename'
import reset from './reset'

program.command(`version`, {
		desc: `Display ${name} version`,
		callback: () => console.log(version)
	})

program.command(`build`, {
		desc: `Build distributable files`,
		callback: build,
	})
	.option(`src`, {
		default: `src`,
		desc: `The source directory of your project`,
	})
	.option(`dist`, {
		desc: `The distribution directory your project will compile to`,
	})

program.command(`bundle`, {
		desc: `Build distributable bundle`,
		callback: bundle,
	})
	.option(`src`, {
		default: `src`,
		desc: `The source file of your project`,
	})
	.option(`dist`, {
		desc: `The distribution file/directory your project will compile to`,
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

program.command(`serve`, {
		desc: `Serve a directory of static files`,
		callback: serve,
	})
	.option(`dir`, {
		desc: `The directory to serve`,
		default: `dist`,
	})
	.option(`no-open`, {
		desc: `Prevents browser from opening`,
		flag: true,
	})

program.command(`run`, {
		desc: `Run a file in Node.js`,
		callback: run,
	})
	.option(`file`, {
		desc: `The file to run`,
		default: `./src/index`
	})

program.command(`rename`, {
		desc: `Renames project files`,
		callback: rename,
	})
	.option(`name`, {
		desc: `The new name`
	})

program.command(`reset`, {
		desc: `Resets and renames project`,
		callback: reset,
	})
	.option(`name`, {
		desc: `The new name`
	})

program.parse()

