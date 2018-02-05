import opn from 'opn'
import { readJson } from 'fs-extra'
import { parse } from 'url'

export default async function (options) {
	if(options.url){
		return opn(options.url)
	}
	const pkg = await readJson('package.json')
	let url = pkg.repository
	if (url){
		if(typeof url === 'object'){
			url = url.url
		}
	}
	if (url.indexOf('http') === 0) {
		url = parse(url)
		url = url.pathname
		if(url[0] === '/'){
			url = url.replace('/', '')
		}
	}
	else if (url.indexOf('git@github.com:') === 0){
		url = url.replace('git@github.com:', '')
	}
	url = url.split('.')
	if(url[url.length - 1] === 'git'){
		url.pop()
	}
	url = url.join('.')
	if(options.travis){
		opn(`https://travis-ci.org/${url}`)
	}
	process.exit(0)
}