export default `
	Usage
		$ esca-scripts <command> <options>

	Commands
		$ build          Creates a distribution build
		$ dev            Opens a development server
		$ serve          Serves static content
		$ analyze        Analyze dependency sizes
		$ test           Runs mocha tests
		$ prevent-push   Exit process if current branch is master

	Options
		--input     Input path or file
		            Default: ./src/index.js
		--output    Output path or file
		            Default: [src path]/dist/[src name]
		--minify    Minifies JavaScript, default: true
		--env       Change environment variable, default: production
		--dir       Directory to serve if serving static content
		            Default: ./dist
		--open      Open development site in browser, default: true
		--port      Set to specify development site port
					   If not set, the first open port found will be used
		--prompt    Set to true to prompt y/n before CLI scripts
					   Default: false
		--stage     Sets the stage to be used for serverless
					   Default: staging
		--start     Starting time for logs, default: [serverless default]
		--function  Target serverless function
						Default: [first function in serverless.yml]

	Project Options
		--browser      Set for a browser project
		--react        Set for a React component
		--gatsby       Set for a Gatsby project
		--cli          Set for a CLI project
		--serverless   Set for a serverless project
`