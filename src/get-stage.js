export default function(stage){
	const travisBranch = process.env.TRAVIS_BRANCH
	if (travisBranch) {
		if (travisBranch === 'master') {
			return 'production'
		}
		else {
			return travisBranch.replace(/[^a-zA-Z0-9]/g, '')
		}
	}
	return stage
}