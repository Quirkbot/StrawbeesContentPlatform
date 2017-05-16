import getContentTypeSlug from './getContentTypeSlug'

export default entry =>
	`${getContentTypeSlug(entry.sys.contentType.sys.id)}/${entry.fields.slug}`
