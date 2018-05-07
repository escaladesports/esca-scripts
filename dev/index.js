import React from 'react'
import { render } from 'react-dom'
import Test from '../src-test/component'

let container = document.createElement('div')
document.body.appendChild(container)

render(
	<Test />,
	container
)