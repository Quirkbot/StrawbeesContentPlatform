export default ({
	children,
	icon,
	title,
	description
}) =>
<div className='hero'>
	<img className='icon' src={icon.url} />
	<h1 className='title'>
		{title}
	</h1>
	<p className='description'>
		{description}
	</p>
	{children}
</div>
