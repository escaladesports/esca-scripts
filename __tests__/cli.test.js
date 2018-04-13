import { exec } from 'child-process-promise'
import renderer from 'react-test-renderer'
import React from 'react'
import pkg from '../package.json'

describe(`CLI help`, () => {
	it(`Should return something`, async () => {
		let res = await exec(`babel-node dist version`)
		expect(res.stdout).toEqual(`${pkg.version}\n`)
		expect(res.stderr).toEqual(``)
	})
})
describe(`Build React`, () => {
	it(`Should build a valid React component`, async () => {
		let res = await exec(`babel-node dist build --src test-src --dist test-dist`)
		expect(res.stderr).toEqual(``)
		let TestComponent = await import('../test-dist/react')
		TestComponent = TestComponent.default
		let component = renderer.create(
			<TestComponent />
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})
})