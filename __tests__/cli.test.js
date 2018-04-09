import { exec } from 'child-process-promise'

import pkg from '../package.json'

describe(`CLI help`, () => {
	it(`Should return something`, async () => {
		let res = await exec(`babel-node src/cli version`)
		expect(res.stdout).toEqual(`${pkg.version}\n`)
		expect(res.stderr).toEqual(``)
	})
})