export default (props, appProps) => ({
	contentType      : props.sys.contentTypeId,
	contentTypeTitle : appProps.contentTypeTitles[props.sys.contentTypeId]
})
