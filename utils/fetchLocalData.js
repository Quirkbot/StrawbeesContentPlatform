/* global STATIC, CACHE_SERVER, GRAPHQL_SERVER */

import 'isomorphic-fetch'
import md5 from 'js-md5'

const data = {}

export default async (locale = '', query = '') => {
	query = query.replace(/\s\s+/g, ' ')

	let graphqlUrl = GRAPHQL_SERVER
	if (locale && query) {
		graphqlUrl += `/${locale}/graphql/?query=${encodeURIComponent(query)}`
	}
	// If data is already cached in memory, return early!
	if (data[graphqlUrl]) {
		return JSON.parse(data[graphqlUrl])
	}

	const localUrl = `/static/graphql/${md5(graphqlUrl)}.json`
	const cacheUrl = `${CACHE_SERVER}/?url=${encodeURIComponent(graphqlUrl)}`

	// Define which url to load, depending on the context
	let url
	if (STATIC) {
		// Static...
		if (process.browser) {
			// Static client
			url = localUrl
		} else {
			// Static server (build process)
			url = cacheUrl
		}
	} else {
		// Development
		url = graphqlUrl
		console.log('Fetch local data')
		console.log(graphqlUrl)
	}

	// Fecth the data
	const res = await fetch(url)
	const json = (await res.json())
	const results = json.data
	const errors = json.errors

	if (errors) {
		console.log('Local data errors')
		console.log(errors)
	}


	// Store it in memory
	data[graphqlUrl] = JSON.stringify(results)

	// Return it
	return results
}
