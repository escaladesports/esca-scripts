import { branch } from 'git-rev-promises'

export default async function(){
	const currentBranch = await branch()
	if (currentBranch === `master`) {
		console.log(`Deployment to master branch prevented.`)
		process.exit(1)
	}
}