import Link from 'src/components/link'
import SvgIcon from 'src/components/svgIcon'
import generateClassnames from 'src/utils/generateClassnames'

export default ({
	title,
	cssColor = 'rgba(0,0,0,0.05)',
	cssTextColor = 'inherit',
	icon,
	url,
	external,
	border = true,
	small = false,
	onClick = () => {}
}) =>
	<div
		className={`root button ${generateClassnames({
			title,
			icon,
			url,
			border,
			small
		})}`}
		onClick={onClick}>
		<style jsx>{`
			.root {
				box-sizing: border-box;
				border-radius: 3rem;
				cursor: pointer;
				color: ${cssTextColor};
				background-color: ${cssColor};
				border: solid 1px rgba(0,0,0,0);
				transition: transform 0.1s;
			}
			.root:hover {
				transform: scale(1.1);
			}
			.root.icon.title {
				padding: 0.15rem 0.8rem 0.15rem 0.15rem;
			}
			.root.icon:not(.title) {
				padding: 0.15rem;
			}
			.root.title:not(.icon) {
				padding: 0.4rem 0.8rem;
			}
			.root.border {
				border: solid 1px;
			}
			.root :global(.link){
				text-decoration: none;
				color: inherit;
				display: block;
				text-transform: uppercase;
				display: flex;
				flex-direction: row;
				align-items: center;
				font-weight: 500;
			}
			.root .title {
				height: 2.2rem;
				line-height: 2.2rem;
			}
			.root :global(svg){
				width: 2.2rem;
				height: 2.2rem;
			}
			.root.title :global(svg) {
				margin-right: 0.3rem;
			}

			.root.small .title {
				font-size: 0.8rem;
				height:  0.8rem;
				line-height: 1
			}
			.root.small :global(svg){
				height: 1.2rem;
				width: 1.2rem;
			}

			@media print {
				.root.title:not(.icon) {
					padding: 0.4rem 0.8rem;
				}
				.root.not-small .title {
					font-size: 0.8rem;
					height: 0.8rem;
					line-height: 0.8rem;
				}
			}
		`}</style>
		<Link external={external} to={url}>
			{icon &&
				<SvgIcon icon={icon}/>
			}
			{title &&
				<div className='title'>
					{title}
				</div>
			}
		</Link>
	</div>
