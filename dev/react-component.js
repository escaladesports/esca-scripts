import React from 'react'
import { render } from 'react-dom'
import jsCookie from 'js-cookie'

import Worker from 'worker-loader!./worker'

export default class Component extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {

		const worker = new Worker()
		worker.postMessage({ a: 1 })
		worker.addEventListener('message', e => {
			console.log(e.data)
		})


		const testVar = 'test'
		console.log('TESTVAR:', testVar)
		console.log('MODULE:', jsCookie)
	}
	render() {
		let color = 'red'
		return (
			<div>
				This is a React component!
				<style jsx global>{`
					div{
						color: ${color};
						height: 20px;
					}
				`}</style>
			</div>
		)
	}
}
