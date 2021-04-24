
const path = require('path')

module.exports = {
	mode: 'production',
	entry: './js/index.js',
	output: {
		filename: 'bundled.js',
		path: path.resolve(__dirname, 'dist'),
	},
}
