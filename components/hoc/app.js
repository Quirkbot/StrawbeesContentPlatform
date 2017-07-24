import React from 'react'
import Head from 'next/head'

import LocalesMenu from 'src/components/localesMenu'
import fetchLocalData from 'src/utils/fetchLocalData'

export default Child => class App extends React.Component {
	static async getInitialProps(ctx) {
		const result = await Promise.all([
			(async () => {
				const {	locale } = ctx.query
				const localData = await fetchLocalData(locale, `{
					siteMetas(q: "order=-sys.createdAt&limit=1"){
						locale
						languageName
						basename
						avaiableLocales

						lessonPlanSlug
						lessonPlanCollectionSlug
						lessonPlanGroupSlug
					}
				}`)
				const data = localData.siteMetas.shift()
				const currentLocale = {
					locale       : data.locale,
					languageName : data.languageName,
					basename     : data.basename ? data.basename : ''
				}
				const avaiableLocales = data.avaiableLocales.map(line => {
					const array = line.split('_')
					return {
						locale       : array[0],
						languageName : array[1],
						basename     : array[2] ? array[2] : ''
					}
				})
				const contentTypeSlugs = Object.keys(data)
					.filter(key => key.endsWith('Slug'))
					.reduce((acc, key) => {
						const type = key.replace('Slug', '')
						acc[type] = data[key]
						return acc
					}, {})
				return {
					currentLocale,
					avaiableLocales,
					contentTypeSlugs
				}
			})(),
			Child.getInitialProps(ctx, fetchLocalData)
		])
		const meta = result[0]
		const props = result[1]
		return {
			meta,
			...props
		}
	}

	render() {
		return (
			<div>
				<Head></Head>
				<LocalesMenu {...this.props.meta}/>
				<Child {...this.props} />
				<h4>This is the footer</h4>
			</div>
		)
	}
}
