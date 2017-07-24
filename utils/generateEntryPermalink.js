export default ({ meta, contentType, slug }) => {
	let url = '/'
	url += meta.currentLocale.basename
	url += meta.currentLocale.basename ? '/' : ''
	url += meta.contentTypeSlugs[contentType]
	url += slug ? '/' : ''
	url += slug ? slug : ''
	return url
}
