require('isomorphic-fetch')
const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')
const md5 = require('js-md5')
const saveJson = require('../utils/saveJson')

const init = async () => {
	createServer(async (req, res) => {
		const parsedUrl = parse(req.url, true)
		const { query } = parsedUrl
		const { url } = query

		const dataReq = await fetch(url)
		const data = await dataReq.json()

		const file = `${md5(url)}.json`
		saveJson(path.join(__dirname, '..', '..', 'static', 'graphql', file), data)
		saveJson(path.join(__dirname, '..', '..', 'out', 'static', 'graphql', file), data)

		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Request-Method', '*')
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
		res.setHeader('Access-Control-Allow-Headers', '*')
		res.setHeader('content-type', 'application/json')
		res.end(JSON.stringify(data))
	})
	.listen(4000, (err) => {
		if (err) throw err
		// eslint-disable-next-line no-console
		console.log('> Ready on http://localhost:4000')
	})
}
init()
