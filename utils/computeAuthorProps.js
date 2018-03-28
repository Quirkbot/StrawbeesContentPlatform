export default (props, appProps) => ({
	author      : props.author && `${props.author.name} @ ${props.author.organization}`,
	authorLabel : appProps.strings.author
})
