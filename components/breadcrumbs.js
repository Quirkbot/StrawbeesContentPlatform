import Link from 'src/components/link'
import SvgIcon from 'src/components/svgIcon'

export default ({
	list
}) =>
<div className='root breadcrumbs'>
	<style jsx>{`
		.root {
			padding: 0 1rem 1rem 1rem;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}
		.wrapper {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			max-width: 60rem;
			flex-grow: 1;
		}
		.item {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.item :global(.link) {
			text-decoration: none;
			color: inherit;
			font-weight: 500;
		}
		.item :global(.link:last-child) {
			margin-right: none;
		}
		.item :global(svg) {
			width: 1rem;
			height: 1rem;
			margin: 0 0.5rem;
			opacity: 0.2;
		}
		@media screen and (max-width: 600px) {
			.root {
				padding: 0 1rem 1rem 1rem;
			}
			.item :global(svg) {
				width: 0.8rem;
				height: 0.8rem;
				margin: 0 0.2rem;
			}
			.item :global(.link) {
				font-size: 0.8rem;
			}
		}
		@media print {
			.root {
				display: none;
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
