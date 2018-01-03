require('dotenv').config()

const path = require('path')
const execute = require('../utils/execute')
const delay = require('../utils/delay')
const modulePath = require('../utils/modulePath')
const rmdir = require('../utils/rmdir')

execute(async ({ exec, fork, forkAsync }) => {
	// clean
	await rmdir('out')
	await rmdir('.next')
	await rmdir('static/routes.json')
	await rmdir('static/graphql')
	await rmdir('node_modules/.cache/babel-loader')
	// start graphql server
	const graphqlServer = forkAsync(path.join(modulePath('strawbees-content-graphql-server'), 'server.js'))
	await delay(20000)
	// generate content types
	await fork('lib/services/generate-content-types.js')
	// generate routes
	await fork('lib/services/generate-routes.js')
	// start cache server
	const cacheServer = forkAsync('lib/services/cache-server.js')
	// export the static site
	await exec('STATIC=static NODE_ENV=production next build')
	await exec('next export')
	// kill the cache server
	cacheServer.kill()
	// kill the graphql server
	graphqlServer.kill()
})
