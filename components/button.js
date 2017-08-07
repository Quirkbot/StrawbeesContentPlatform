import Link from 'src/components/link'
import SvgIcon from 'src/components/svgIcon'
import generateClassnames from 'src/utils/generateClassnames'

export default ({
	title,
	icon,
	url,
	border = true,
	onClick = () => {}
}) =>
	<div
		className={`root button ${generateClassnames({
			title,
			icon,
			url,
			border
		})}`}
		onClick={onClick}>
		<style jsx>{`
			.root {
				box-sizing: border-box;
				border-radius: 3rem;
			}
			.root.not-border {
				background-color: rgba(0,0,0,0.05);
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
			.root:hover {
				opacity: 0.7;
			}
			.root.border {
				border: solid 1px;
			}
			.root :global(a){
				cursor: pointer;
				text-decoration: none;
				color: inherit;
				display: block;
				text-transform: uppercase;
				display: flex;
				flex-direction: row;
				align-items: center;
				font-weight: 500;
			}

			.root :global(svg){
				width: 2.2rem;
				height: 2.2rem;
			}
			.root.title :global(svg) {
				margin-right: 0.3rem;
			}
		`}</style>
		<Link to={url}>
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
