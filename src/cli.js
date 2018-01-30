#!/usr/bin/env node
import meow from 'meow'

const cli = meow(`
	Usage
		$ esca-scripts <command> <options>

	Commands
		$ build		Creates a distribution build
		$ dev			Opens a development server

	Project Options
		$ --react	Set for a React component
		$ --js		Set for a JS-only module
		$ --mobx		Set if including MobX in your React or Gatsby project
		$ --gatsby	Set for a Gatsby project
`, {
	flags: {
		js: {
			type: 'boolean',
			alias: 'j'
		}
	}
})

console.log('INPUT:', cli.input)
console.log('FLAGS:', cli.flags)