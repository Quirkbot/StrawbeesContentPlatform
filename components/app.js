import 'isomorphic-fetch'
import React from 'react'
import Head from 'next/head'
import fetchLocalData from 'utils/fetchLocalData'

export default Child => class App extends React.Component {
	static async getInitialProps(ctx) {
		const result = await Promise.all([
			(async () => {
				const {	locale } = ctx.query
				const metas = await fetchLocalData(locale, `{
					siteMetas {
						languageName
					}
				}`)
				return metas.siteMetas.shift()
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
				<h4>This is the header</h4>
				<Child {...this.props} />
				<h4>This is the footer</h4>
			</div>
		)
	}
}
