require('isomorphic-fetch')

const pluralize = require('pluralize')
const env = require('../../env.config')
const config = require('../../contentful.config')


const {
	GRAPHQL_SERVER
} = env

module.exports = async () => {
	// Fetch the avaiable locales
	const metasRes = await fetch(GRAPHQL_SERVER)
	const metas = await metasRes.json()

	// Build routes for each locale
	const routesGroup = await Promise.all(metas.map(buildRoutes))
	const routes = routesGroup.reduce((acc, o) => Object.assign(acc, o), {})
	return routes
}

const buildRoutes = async meta => {
	const {
		contentTypesPages
	} = config

	const {
		locale
	} = meta

	let {
		basename
	} = meta

	basename = basename || ''

	const res = await fetch(`${GRAPHQL_SERVER}/${locale}/graphql?query=${encodeURIComponent(`{
		settings {
			redirects
		}
		contentTypeSlugs (q : "order=-sys.createdAt", limit : 1) {
			${Object.keys(contentTypesPages).map(type => type).join(' ')}
		}
		${Object.keys(contentTypesPages).map(type => `
			${pluralize(type)} {
				sys {
					id
				}
				slug
			}
		`).join('')}
	}`)}`)

	const { data } = await res.json()
	const contentTypeSlugs = data.contentTypeSlugs.pop()
	const redirects = data.settings.pop().redirects
		.map(raw => raw.split('_'))
		.filter(rule => rule.length === 2)
		.map(rule => ({ source : rule[0], destination : rule[1] }))

	const routes = {}

	routes[`/${basename}`] = {
		page  : '/',
		query : {
			locale
		}
	}

	// routes[`${basename ? '/' : ''}${basename}/translation-status`] = {
	// 	page  : '/translationStatus',
	// 	query : {
	// 		locale
	// 	}
	// }

	Object.keys(contentTypesPages).forEach(type => {
		const typeSlug = contentTypeSlugs[type]

		const {
			index  : hasIndex,
			single : hasSingle
		} = contentTypesPages[type]

		if (hasIndex) {
			routes[`${basename ? '/' : ''}${basename}/${typeSlug}`] = {
				page  : `/contentful/${type}-list`,
				query : {
					locale,
					contentType : type
				}
			}
		}

		if (hasSingle) {
			data[`${pluralize(type)}`].forEach(({ slug, sys }) =>
				routes[`${basename ? '/' : ''}${basename}/${typeSlug}/${slug || sys.id}`] = {
					page  : `/contentful/${type}-single`,
					query : {
						locale,
						contentType : type,
						id          : sys.id
					}
				}
			)
		}
	})

	routes[`/${basename}`] = {
		page  : '/',
		query : {
			locale
		}
	}

	redirects.forEach(({ source, destination }) => {
		routes[source] = {
			page  : '/redirect',
			query : {
				source,
				destination
			}
		}
	})

	return routes
}
