import exeq from 'exeq'

export default function(){
	exeq(`mocha --require babel-core/register`)
}