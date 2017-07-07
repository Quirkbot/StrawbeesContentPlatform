const path = require('path')
const cfGraphql = require('cf-graphql')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const md5 = require('js-md5')
const fetchSpaceLocaleMetas = require('../utils/fetchSpaceLocaleMetas')
// const rmdir = require('../utils/rmdir')
// const mkdir = require('../utils/mkdir')
const saveJson = require('../utils/saveJson')
const config = require('./../../contentful.config.json')

const init = async () => {
	try {
		// await rmdir(path.join(__dirname, 'static', 'graphql'))
		// await mkdir(path.join(__dirname, 'static', 'graphql'))
		const {
			cdaToken : accessToken,
			spaceId  : space
		} = config
		// Fetch the avaiable locales
		const locales = await fetchSpaceLocaleMetas({ accessToken, space })
		// Create a data server for each locale
		await Promise.all(locales.map(locale => createDataServer({
			spaceId     : config.spaceId,
			cdaToken    : config.cdaToken,
			cmaToken    : config.cmaToken,
			graphqlPort : locale.localGraphQlPort,
			locale      : locale.locale
		})))

		locales.map(({ languageName, localGraphQlPort }) =>
			// eslint-disable-next-line no-console
			console.log(`Serving ${languageName} on port ${localGraphQlPort}`)
		)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error', error)
	}
}

const createDataServer = async ({ spaceId, cdaToken, cmaToken, graphqlPort, locale }) => {
	const client = cfGraphql.createClient({ spaceId, cdaToken, cmaToken, locale })

	const types = await client.getContentTypes()
	const graph = await cfGraphql.prepareSpaceGraph(types)
	const schema = cfGraphql.createSchema(graph)

	startServer(client, schema, graphqlPort)
}

const startServer = (client, schema, port) => {
	const app = express()
	const ui = cfGraphql.helpers.graphiql({ title : 'cf-graphql demo' })
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*')
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
		next()
	})
	app.get('/', (_, res) => res.set(ui.headers).status(ui.statusCode).end(ui.body))

	const opts = { version : false, timeline : false, detailedErrors : false }
	const ext = cfGraphql.helpers.expressGraphqlExtension(client, schema, opts)
	app.get('/graphql', (req, res, next) => {
		res.tempJson = res.json
		res.json = (data) => {
			const base = `${req.get('host')}${req.url}`
			const file = `${md5(base)}.json`
			saveJson(path.join(__dirname, '..', '..', 'static', 'graphql', file), data)
			saveJson(path.join(__dirname, '..', '..', 'out', 'static', 'graphql', file), data)
			res.tempJson(data)
		}
		next()
	})
	app.get('/graphql', graphqlHTTP(ext))
	app.post('/graphql', graphqlHTTP(ext))

	app.listen(port)
}

init()
