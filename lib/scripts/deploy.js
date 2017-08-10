const execute = require('../utils/execute')

execute(async ({ exec, fork, forkAsync }) => {
	// build
	console.log('start')
	await fork('lib/scripts/build.js')
	console.log('end')
})
