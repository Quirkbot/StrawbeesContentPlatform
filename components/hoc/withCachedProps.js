import React from 'react'

const CACHE = {}

export default (Child, q) => class WithCachedProps extends React.Component {
	static getInitialProps = async ctx => {
		const qid = JSON.stringify(q)

		if (CACHE[qid]) {
			return CACHE[qid]
		}
		ctx.q = q
		const childProps = await Child.getInitialProps(ctx)
		return {
			qid,
			...childProps
		}
	}

	render() {
		const {
			qid
		} = this.props

		if (!CACHE[qid]) {
			CACHE[qid] = this.props
		}
		return (<Child {...CACHE[qid]} />)
	}
}
