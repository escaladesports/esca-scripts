import React from 'react'
import { render } from 'react-dom'

export default class Component extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		const testVar = 'test'
		console.log('TESTVAR:', testVar)
	}
	render() {
		return (
			<div>
				This is a React component!
				<style jsx>{`
					div{
						color: red;
					}
				`}</style>
			</div>
		)
	}
}
