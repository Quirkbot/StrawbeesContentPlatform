/* global STATIC, CACHE_SERVER, GRAPHQL_SERVER */

import 'isomorphic-fetch'
import md5 from 'js-md5'

const data = {}

export default async (locale, query) => {
	query = query.replace(/\s/g, '')
	const url = `${GRAPHQL_SERVER}/${locale}/graphql/?query=${encodeURIComponent(query)}`

	if (data[url]) {
		return data[url]
	}

	let fetchUrl
	if (STATIC && process.browser) {
		fetchUrl = `/static/graphql/${md5(url)}.json`
	} else {
		fetchUrl = `${CACHE_SERVER}/?url=${encodeURIComponent(url)}`
	}
	const res = await fetch(fetchUrl)
	data[url] = (await res.json()).data

	return data[url]
}
