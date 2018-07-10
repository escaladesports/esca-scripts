function createConfig() {
	console.log(`Building ESLint config...`)
	const config = {
		parser: 'babel-eslint',
		extends: 'eslint:recommended',
		env: {
			es6: true,
			node: true
		},
		settings: {
			'import/core-modules': [
				'styled-jsx',
				'styled-jsx/css'
			]
		},
		parserOptions: {
			ecmaFeatures: {
				jsx: true
			},
			ecmaVersion: 2018,
			sourceType: 'module'
		},
		plugins: [
			'import',
			'react',
			'jsx-a11y',
		],
		globals: {
			graphql: true,
		},
		rules: {
			indent: [
				'error',
				'tab'
			],
			'linebreak-style': [
				'error',
				'unix'
			],
			quotes: [
				'error',
				'backtick'
			],
			semi: [
				'error',
				'never'
			],
			'react/jsx-uses-react': 'error',
			'react/jsx-uses-vars': 'error'
		}
	}
	return config
}

export default createConfig