import { stat } from 'fs-extra'

async function getDist(src){
	let splitSrc = src.split('/')
	if(!(await stat(src)).isDirectory()){
		splitSrc.pop()
	}
	let dirName = splitSrc.pop()
	splitSrc = splitSrc.join(`/`)
	if(splitSrc) splitSrc = `${splitSrc}/`
	if (dirName === 'src'){
		return `${splitSrc}dist`
	}
	return `${splitSrc}dist-${dirName}`
}

export default getDist