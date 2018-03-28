import Head from 'next/head'

export default props =>
	<Head>
		<link rel="canonical" href={props.url.query.destination} />
		<meta httpEquiv="refresh" content={`0;URL='${props.url.query.destination}'`} />
	</Head>
