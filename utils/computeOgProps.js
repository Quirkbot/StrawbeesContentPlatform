export default (props, appProps) => ({
	ogTitle       : `${props.title} - ${appProps.settings.ogTitle}`,
	ogDescription : props.description,
	ogImage       : props.featuredImage && `https:${props.featuredImage.url}`
})
