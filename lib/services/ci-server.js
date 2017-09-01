require('dotenv').config()

const { createServer } = require('http')
const { parse } = require('url')

const execute = require('../utils/execute')
const delay = require('../utils/delay')

const port = process.env.CI_PORT || process.env.PORT || 4004

let needsDeploy = true
let deploying = false

const deploy = async () => execute(async ({ fork }) => {
	if (needsDeploy) {
		needsDeploy = false
		// deploy
		deploying = true
		await fork('lib/scripts/deploy.js')
		deploying = false
	}
})

const recursiveDeploy = async () => {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		await deploy()
		await delay(10000)
	}
}

const init = async () => {
	createServer(async (req, res) => {
		const parsedUrl = parse(req.url, true)
		if (parsedUrl.pathname === '/contentful' || parsedUrl.pathname === '/contentful/') {
			needsDeploy = true
		}
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Request-Method', '*')
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
		res.setHeader('Access-Control-Allow-Headers', '*')
		res.setHeader('content-type', 'application/json')
		res.end(JSON.stringify({ deploying, needsDeploy }))
	})
	.listen(port, (err) => {
		if (err) throw err
		// eslint-disable-next-line no-console
		console.log(`> CI server ready on http://localhost:${port}`)
	})
	await recursiveDeploy()
}

init()
