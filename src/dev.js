import { spawn } from 'child-process-promise'

function dev({ src }){
	spawn(`parcel ${src}`, ['--open'], {
		shell: true,
		stdio: 'inherit'
	})
}

export default dev
