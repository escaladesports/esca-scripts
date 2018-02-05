import React from 'react'
import { render } from 'react-dom'
import jsCookie from 'js-cookie'

export default class Component extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		const testVar = 'test'
		console.log('TESTVAR:', testVar)
		console.log('MODULE:', jsCookie)
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
