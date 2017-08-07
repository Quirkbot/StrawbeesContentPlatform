import Link from 'src/components/link'
import SvgIcon from 'src/components/svgIcon'

export default ({
	list
}) =>
<div className='root breadcrumbs'>
	<style jsx>{`
		.root {
			padding: 0 2rem 1rem 2rem;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}
		.wrapper {
			display: flex;
			flex-direction: row;
			max-width: 67.5rem;
			flex-grow: 1;
		}
		.item {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.item :global(a) {
			text-decoration: none;
			color: inherit;
			font-weight: 500;
		}
		.item :global(a:last-child) {
			margin-right: none;
		}
		.item :global(svg) {
			width: 1rem;
			height: 1rem;
			margin: 0 0.5rem;
			opacity: 0.2;
		}
		@media (max-width: 600px) {
			.wrapper {
				flex-direction: column;
				align-items: flex-start;
			}
			.item {
				flex-direction: column;
				align-items: flex-start;
			}
			.item :global(svg) {
				transform: rotate(90deg);
				margin: 0;
			}
		}
	`}</style>
	<div className='wrapper'>
		{list && list
			.map(({ url, title }, i) =>
			<div key={i}
				className='item'>
				<Link
					to={url}>
					{title}
				</Link>
				{i < (list.length - 1) &&
					<SvgIcon icon='right-arrow'/>
				}
			</div>
		)}
	</div>
</div>
