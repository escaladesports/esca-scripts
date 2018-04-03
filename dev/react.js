import React from 'react'
import { render } from 'react-dom'

import Component from './react-component'

const container = document.createElement('div')
render(<Component />, container)
const body = document.querySelector('body')
body.appendChild(container)
