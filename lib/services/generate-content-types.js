require('dotenv').config()
require('isomorphic-fetch')

const env = require('../../env.config')
const path = require('path')
const saveJson = require('../utils/saveJson')

const {
	GRAPHQL_SERVER
} = env

const init = async () => {
	const contentTypesRes = await fetch(`${GRAPHQL_SERVER}/content-types`)
	const contentTypes = await contentTypesRes.json()
	await saveJson(path.join(__dirname, '..', '..', 'static', 'content-types.json'), contentTypes)
}
init()
