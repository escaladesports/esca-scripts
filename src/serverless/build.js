import spawn from '../spawn'

export default async function (options) {
	return await spawn(`serverless package`, options)
}