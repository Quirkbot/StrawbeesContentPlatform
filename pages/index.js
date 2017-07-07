import App from 'components/app'
import Link from 'components/link'

const Page = props =>
	<div>
		<Link to='/'>EN</Link>
		<Link to='/th'>TH</Link>
		<pre>{JSON.stringify(props, null, 2)}</pre>
	</div>

Page.getInitialProps = async ({ query }, fetchLocalData) => {
	const {	locale, contentType, id } = query
	return fetchLocalData(locale, `{
		tags {
			slug
		}
	}`)
}


export default App(Page)
