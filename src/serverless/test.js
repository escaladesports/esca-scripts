import spawn from '../spawn'

export default async function (options) {
	return await spawn(`SLS_DEBUG=* serverless invoke test --stage ${options.stage} --compilers js:babel-core/register`, options)
}