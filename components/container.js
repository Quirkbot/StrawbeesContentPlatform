import Head from 'next/head'

import Header from 'components/header'

export default ({ children, ...props }) =>
	<div>
		<Head>
		</Head>

		<h4>This is the header</h4>

		<Header {...props} />

		{children}

		<h4>This is the footer</h4>
	</div>
