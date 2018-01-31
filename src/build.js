import webpack from 'webpack'

export default function (config) {
	webpack(config, err => {
		if (err) {
			console.error(err)
			process.exit(1)
		}
	})
}