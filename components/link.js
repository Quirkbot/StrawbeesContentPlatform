import Link from 'next/link'
import routes from 'static/routes'

export default ({ children, ...props }) => {
	const {
		to,
		...otherProps
	} = props

	let href
	let as

	if (routes[to]) {
		href = {
			pathname : routes[to].page,
			query    : routes[to].query
		}
		as = to
	} else {
		href = to
	}

	return (
		<Link href={href} as={as} {...otherProps}>
			<a>{children}</a>
		</Link>
	)
}
