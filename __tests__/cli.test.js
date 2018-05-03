import { exec } from 'child-process-promise'
import renderer from 'react-test-renderer'
import React from 'react'
import { copy, readFile } from 'fs-extra'
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
/*
describe(`Bundle`, () => {
	it(`Should build a valid React component`, async () => {
		let res = await exec(`babel-node dist bundle --src src-test/component.js --dist dist-bundle-test`)
		expect(res.stderr).toEqual(``)

		let TestComponent = await import(`../dist-bundle-test/component`)
		TestComponent = TestComponent.default
		let component = renderer.create(
			<TestComponent />
		)
		let tree = component.toJSON()
		expect(tree).toMatchSnapshot()
	})
})
*/
describe(`Rename`, () => {
	beforeAll(async () => {
		await Promise.all([
			copy(`./package.json`, `./dist-test/package.json`),
			copy(`./src-test/serverless.yml`, `./dist-test/serverless.yml`),
		])
		let res = await exec(`cd dist-test && babel-node ../dist rename`)
		expect(res.stderr).toEqual(``)
	})
	it(`Should rename a package.json file`, async () => {
		let pkg = await import(`../dist-test/package.json`)
		expect(pkg.name).toEqual(`dist-test`)
	})
	it(`Should rename a serverless.yml file`, async () => {
		let config = await readFile(`./dist-test/serverless.yml`)
		config = config.toString()
		config = config.split(`\n`)
		expect(config[0]).toEqual(`service: dist-test`)
	})
	afterAll(async () => {
		let res = await exec(`rm -rf test-dist`)
		expect(res.stderr).toEqual(``)
	})
})
describe(`Run`, () => {
	it(`Should run a file with ES6`, async () => {
		let res = await exec(`babel-node dist run --file src-test/run.js`)
		expect(res.stderr).toEqual(``)
		res = res.stdout.trim()
		res = res.split(`\n`)
		res = res.pop()
		expect(res).toEqual(`19`)
		res = await exec(`rm -rf test-dist`)
		expect(res.stderr).toEqual(``)
	})
})