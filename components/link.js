import Link from 'next/link'
import routes from 'src/static/routes.json'

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
			<a className={`root link ${href ? 'to' : 'not-to'}`}>
				<style jsx>{`
					.root {
						display: block;
					}
					.root.to:hover {
						opacity: 0.7;
					}
				`}</style>
				{children}
			</a>
		</Link>
	)
}
