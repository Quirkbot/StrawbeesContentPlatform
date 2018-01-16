import Link from 'next/link'
import routes from 'src/static/routes.json'
import generateClassnames from 'src/utils/generateClassnames'

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

	if (to) {
		return (
			<Link href={href} as={as} {...otherProps}>
				<a
					className={`root link ${generateClassnames({
						to,
						external
					})}`}
					target={external && '_blank'}>
					<style jsx>{`
						.root {
							display: block;
							cursor: pointer;
						}
					`}</style>
					{children}
				</a>
			</Link>
		)
	}

	return (
		<span className={`root link ${generateClassnames({
			to,
			external
		})}`}>
			<style jsx>{`
				.root {
					display: block;
				}
			`}</style>
			{children}
		</span>
	)
}
