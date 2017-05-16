import Page from '../../page.js'
import getAssetUrl from '../../../utils/getAssetUrl'

export default ({ asPath, data }) =>
	<Page>
		<h1>{data.fields.title}</h1>
		<img src={getAssetUrl(data.fields.featuredImage, 'thumbnail', asPath)}/>
	</Page>
