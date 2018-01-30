import webpack from 'webpack'

export default function (config) {
	return new Promise((resolve, reject) => {
		webpack(config, (err, stats) => {
			if (err) return reject(err)
			resolve(stats)
		})
	})
}