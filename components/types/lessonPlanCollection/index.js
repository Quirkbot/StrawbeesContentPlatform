import Link from 'next/link'
import Page from '../../page'
import getPathRoot from '../../../utils/getPathRoot'
import getEntryPermalink from '../../../utils/getEntryPermalink'

export default ({ asPath, data }) =>
	<Page>
		{data.map(item => (
			<Link key={item.sys.id}>
				<a href={`${getPathRoot(asPath)}${getEntryPermalink(item)}`}>
					{item.fields.title}
				</a>
			</Link>
		))}
	</Page>
