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

	const toContainer = (
		<a className='root link to'
			href={external && to}
			target={external && '_blank'}
			onClick={e => {
				console.log('aaa')
				external || e.preventDefault()
			}}>
			<style jsx>{`
				.root {
					display: block;
					cursor: pointer;
				}
				/*.root.to:hover {
					opacity: 0.7;
				}*/
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
