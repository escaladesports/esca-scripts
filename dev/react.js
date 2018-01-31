import React from 'react'
import { render } from 'react-dom'

class Component extends React.Component {
	render() {
		return (
			<div>This is a React component!</div>
		)
	}
}

const container = document.createElement('div')
render(<Component />, container)
const body = document.querySelector('body')
body.appendChild(container)