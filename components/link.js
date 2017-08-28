import Link from 'next/link'
import routes from 'src/static/routes.json'

export default ({ children, ...props }) => {
	const {
		to,
		external,
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
	const toContainer = (
		<a className='root link to'
			href={external && href}
			target={external && '_blank'}>
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
	)
	const notToContainer = (
		<span className='root link not-to'>
			<style jsx>{`
				.root {
					display: block;
				}
				.root.to:hover {
					opacity: 0.7;
				}
			`}</style>
			{children}
		</span>
	)
	if (href) {
		if (external) {
			return toContainer
		}
		return (
			<Link href={href} as={as} {...otherProps}>
				{toContainer}
			</Link>
		)
	}

	return notToContainer
}
