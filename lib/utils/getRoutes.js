require('isomorphic-fetch')
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

	const res = await fetch(`${GRAPHQL_SERVER}/${locale}/graphql?query={
		${Object.keys(contentTypesPages).map(type => `
			${type}s {
				sys {
					id
				}
				slug
			}
		`).join('')}
	}`)
	const data = (await res.json()).data

	const routes = {}

	routes[`/${basename}`] = {
		page  : '/',
		query : {
			locale
		}
	}

	Object.keys(contentTypesPages).forEach(type => {
		const typeSlug = meta[`${type}Slug`]

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
			data[`${type}s`].forEach(({ slug, sys }) =>
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

	return routes
}
