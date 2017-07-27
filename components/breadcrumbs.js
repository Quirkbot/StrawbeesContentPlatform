import Link from 'src/components/link'

export default ({
	list
}) =>
<div className='root breadcrumbs'>
	{list
		.map(({ url, title }, i) =>
		<Link
			key={i}
			to={url}>
			{title}
		</Link>
	)}
</div>
