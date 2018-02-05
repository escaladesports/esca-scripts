import del from 'del'

export default async function (config, options) {
	await del([
		'.serverless',
		'dist',
		'dist-*',
		'.cache',
		'cache',
		'public',
	])
}