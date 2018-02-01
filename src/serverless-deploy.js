import spawn from './spawn'

export default async function(stage = 'staging'){
	const travisBranch = process.env.TRAVIS_BRANCH
	if (travisBranch) {
		if (travisBranch === 'master') {
			stage = 'production'
		}
		else {
			stage = travisBranch.replace(/[^a-zA-Z0-9]/g, '')
		}
	}
	await spawn(`SLS_DEBUG=* serverless deploy --verbose --stage ${stage}`, true)
}