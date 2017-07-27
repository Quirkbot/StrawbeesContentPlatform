import generateClassnames from 'src/utils/generateClassnames'

export default ({
	children,
	icon,
	title,
	subtitle,
	description,
	color
}) =>
<div
	className={`root hero ${generateClassnames({
		children,
		icon,
		title,
		subtitle,
		description,
		color
	})}`}
	style={{
		backgroundColor : color
	}}>
	<style jsx>{`
		.root.not-color {
			background-color: #DDD;
			color: #000;
		}
		.root.color {
			color: #FFF;
		}
	`}</style>
	{icon &&
		<img className='icon' src={icon.url} />
	}
	{title &&
		<h1 className='title'>
			{title}
		</h1>
	}
	{subtitle &&
		<h2 className='subtitle'>
			{subtitle}
		</h2>
	}
	{description &&
		<p className='description'>
			{description}
		</p>
	}
	{children}
</div>
