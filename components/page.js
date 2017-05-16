import Head from 'next/head'

export default ({ children }) =>
	<div>
		<Head>
		</Head>
		<h1>This is the Site</h1>
		{children}
		<h4>This is the footer</h4>
	</div>
