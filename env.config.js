const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 5000
const CACHE_PORT = process.env.CACHE_PORT || 4000
module.exports = {
	// eslint-disable-next-line no-unneeded-ternary
	STATIC         : process.env.STATIC ? true : false,
	CACHE_SERVER   : `http://127.0.0.1:${CACHE_PORT}`,
	GRAPHQL_SERVER : `http://127.0.0.1:${GRAPHQL_PORT}`,
	GRAPHQL_PORT,
	CACHE_PORT
}
