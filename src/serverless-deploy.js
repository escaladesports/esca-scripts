import spawn from './spawn'

export default async function(options){
	return await spawn(`SLS_DEBUG=* serverless deploy --verbose --stage ${options.stage}`, options)
}