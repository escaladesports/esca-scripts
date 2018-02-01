import spawn from './spawn'

export default async function () {
	return await spawn(`npm publish`)
}