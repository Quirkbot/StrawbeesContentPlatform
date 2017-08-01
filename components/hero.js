import generateClassnames from 'src/utils/generateClassnames'

export default ({
	strings,
	children,
	icon,
	title,
	subtitle,
	description,
	author,
	color
}) =>
<div
	className={`root hero ${generateClassnames({
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
	{author &&
		<div className='author'>
			<b>{strings.author}</b>
			<span>{author}</span>
		</div>
	}
	{description &&
		<p className='description'>
			{description}
		</p>
	}
	{children}
</div>
