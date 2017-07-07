import 'isomorphic-fetch'
import Link from 'next/link'

const Page = ({ data }) =>
	<div>
		<div>
			<Link href="/">
				<a>en</a>
			</Link>
		</div>
		<div>
			<Link href="/th">
				<a>th</a>
			</Link>
		</div>
		<pre>{JSON.stringify(data, null, 2)}</pre>
	</div>

Page.getInitialProps = async ({ q }) => {
	const {	locale } = q
	const req = await fetch(`https://strawbees-content-graphql-server-scqnjdgvud.now.sh/${locale}/graphql?query={
		tags { title }
	}`)

	const data = (await req.json()).data
	return {
		data
	}
	/*return fetchLocalData(locale, `{
		tags {
			slug
		}
	}`)*/
}

export default Page//App(Page)
