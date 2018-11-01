const path = require('path')

module.exports = {
	entry: path.resolve(__dirname, 'src/index.ts'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
			}
		],
	},
	devServer: {
		port: 9001,
	}
}
