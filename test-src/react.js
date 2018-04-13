import React from 'react'

class TestComponent extends React.Component{
	constructor(props){
		super(props)
		const obj = {
			test: 'Testing.'
		}
		this.state = {
			...obj
		}
	}
	render(){
		return (
			<div>{this.state.test}</div>
		)
	}
}

export default TestComponent