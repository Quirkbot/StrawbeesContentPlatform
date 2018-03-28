import generateUrl from 'src/utils/generateUrl'

export default (props, appProps) => ({
	url : generateUrl({
		appProps,
		contentType : props.sys.contentTypeId,
		slug        : props.slug
	})
})
