import Link from 'next/link'
import getEntryPermalink from '../../../utils/getEntryPermalink'

export default ({ asPath, data }) =>
	<div>
		<style jsx>{`
			a {
				color: red;
			}
		`}</style>
		<Link>
			<a href={getEntryPermalink(data, asPath)}>
				<h3>{data.fields.title}</h3>
			</a>
		</Link>
	</div>
