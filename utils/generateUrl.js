export default ({ appProps, contentType, slug }) => {
	let url = '/'
	url += appProps.settings.currentLocale.basename
	if (contentType) {
		url += appProps.settings.currentLocale.basename ? '/' : ''
		url += appProps.contentTypeSlugs[contentType]
	}
	if (contentType && slug) {
		url += `/${slug}`
	}
	return url
}
