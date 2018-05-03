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
			<section>
				<div>1</div>
				<div className='test'>{this.state.test}</div>
				<div>3</div>
				<style jsx>{`
					section{
						lost-utility: clearfix;
						div{
							lost-column: 1/3;
							:nth-of-type(2){
								color: red;
							}
						}
					}
				`}</style>
			</section>
		)
	}
}

export default TestComponent