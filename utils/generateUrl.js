export default ({ appProps, contentType, slug }) => {
	let url = '/'
	url += appProps.currentLocale.basename
	if (contentType) {
		url += appProps.currentLocale.basename ? '/' : ''
		url += appProps.contentTypeSlugs[contentType]
	}
	if (contentType && slug) {
		url += `/${slug}`
	}
	return url
}
