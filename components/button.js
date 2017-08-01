import Link from 'src/components/link'
import SvgIcon from 'src/components/svgIcon'

export default ({
	title,
	icon,
	url
}) =>
	<div
		className='root button'>
		<style jsx>{`
			.root :global(a){
				text-decoration: none;
				color: inherit;
				display: block;
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
