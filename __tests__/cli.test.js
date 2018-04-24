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
describe(`Build`, () => {
	beforeAll(async () => {
		let res = await exec(`babel-node dist build --src src-test --dist dist-test`)
		expect(res.stderr).toEqual(``)
	})
	it(`Should build a valid React component`, async () => {
		let TestComponent = await import('../dist-test/component')
		TestComponent = TestComponent.default
		let component = renderer.create(
			<TestComponent />
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})
	it(`Should build a valid JavaScript module`, async () => {
		let TestModule = await import('../dist-test/module')
		TestModule = TestModule.default
		expect(TestModule()).toEqual(19)
	})
	afterAll(async () => {
		let res = await exec(`rm -rf test-dist`)
		expect(res.stderr).toEqual(``)
	})
})