const execute = require('../utils/execute')
const rmdir = require('../utils/rmdir')

execute(async ({ fork, forkAsync }) => {
	// clean
	await rmdir('out')
	await rmdir('.next')
	await rmdir('static/routes.json')
	await rmdir('static/graphql')
	await rmdir('node_modules/.cache/babel-loader')
	// generate routes
	await fork('lib/services/generate-routes.js')
	// start cache server
	const cacheServer = forkAsync('lib/services/cache-server.js')
	// start next
	await fork('next.server.js')
	// kill the cache server
	cacheServer.kill()
})
