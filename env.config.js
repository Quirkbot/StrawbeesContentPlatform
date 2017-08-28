require('dotenv').config()

process.env.GRAPHQL_PORT = process.env.GRAPHQL_PORT || 5000
process.env.CACHE_PORT = process.env.CACHE_PORT || 4000
// eslint-disable-next-line no-unneeded-ternary
process.env.CACHE_SERVER = process.env.CACHE_SERVER || `http://127.0.0.1:${process.env.CACHE_PORT}`
process.env.GRAPHQL_SERVER = process.env.GRAPHQL_SERVER || `http://127.0.0.1:${process.env.GRAPHQL_PORT}`

module.exports = Object.assign({}, process.env)
