export default `
	Usage
		$ esca-scripts <command> <options>

	Commands
		$ build     Creates a distribution build
		$ dev       Opens a development server
		$ serve     Serves static content
		$ analyze   Analyze dependency sizes
		$ test      Runs mocha tests

	Options
		--input    Input path or file
		           Default: ./src/index.js
		--output   Output path or file
		           Default: [src path]/dist/[src name]
		--minify   Minifies JavaScript, default: true
		--env      Change environment variable, default: production
		--dir      Directory to serve if serving static content
		           Default: ./dist
		--open     Open development site in browser, default: true
		--port     Set to specify development site port
		           If not set, the first open port found will be used

	Project Options
		--browser      Set for a browser project
		--react        Set for a React component
		--gatsby       Set for a Gatsby project
		--cli          Set for a CLI project
`