import spawn from '../spawn'

export default async function(options){
	// Prevent pull request deploys
	if (process.env.TRAVIS_PULL_REQUEST == 'true'){
		console.log('Pull request detected. Not deploying.')
		return
	}
	return await spawn(`SLS_DEBUG=* serverless deploy --verbose --stage ${options.stage}`, options)
}