const env = require('./env.config.js')

module.exports = {
	presets : [
		'next/babel'
	],
	plugins : [
		[
			'module-resolver',
			{
				root : [
					'./'
				],
				alias : {
					src : './'
				}
			}
		],
		[
			'transform-define',
			env
		]
	]
}
