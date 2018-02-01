import React from 'react'
import { render } from 'react-dom'

export default class Component extends React.Component {
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

/*
const container = document.createElement('div')
render(<Component />, container)
const body = document.querySelector('body')
body.appendChild(container)
*/