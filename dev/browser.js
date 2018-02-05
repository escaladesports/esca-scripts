import jsCookie from 'js-cookie'

export default class TestClass{
	constructor(){
		const testVar = 'test'
		console.log('VARIABLE:', testVar)
		console.log('MODULE:', jsCookie)
	}
}