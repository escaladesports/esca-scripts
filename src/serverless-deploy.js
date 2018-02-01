import spawn from './spawn'

export default async function(options){
	const travisBranch = process.env.TRAVIS_BRANCH
	if (travisBranch) {
		if (travisBranch === 'master') {
			stage = 'production'
		}
		else {
			stage = travisBranch.replace(/[^a-zA-Z0-9]/g, '')
		}
	}
	const cmds = []
	if(options.yn){
		cmds.push(`yn`)
	}
	cmds.push(`SLS_DEBUG=* serverless deploy --verbose --stage ${stage}`)

	await spawn(cmds.join(' && ', true))
}