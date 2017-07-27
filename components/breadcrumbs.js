import Link from 'src/components/link'

export default ({
	breadcrumbs
}) =>
<div className='root breadcrumbs'>
	{breadcrumbs
		.map(({ url, title }, i) =>
		<Link
			key={i}
			to={url}>
			{title}
		</Link>
	)}
</div>
