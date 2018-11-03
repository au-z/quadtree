const path = require('path')

module.exports = {
	entry: path.resolve(__dirname, 'src/index.ts'),
	output: {
		library: 'Quadtree',
		libraryTarget: 'umd',
		libraryExport: 'default',
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
			},
			{
				test: /\.styl(us)?$/,
				use: [
					'style-loader',
					'css-loader',
					'stylus-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.json', '.ts'],
		alias: {
			'src': path.resolve(__dirname, 'src'),
		},
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		port: 9001,
	},
}
