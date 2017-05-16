import Link from 'next/link'
import getPathRoot from '../utils/getPathRoot'
import getEntryPermalink from '../utils/getEntryPermalink'

export default ({ asPath, data }) =>
	<div>
		<style jsx>{`
			a {
				color: red;
			}
		`}</style>
		<Link>
			<a href={`${getPathRoot(asPath)}${getEntryPermalink(data)}`}>
				<h3>{data.fields.title}</h3>
			</a>
		</Link>
	</div>
