import Link from 'src/components/link'

export default ({
	title,
	description,
	featuredImage,
	url
}) => {
	const Wrapper = url ? Link : 'div'
	return (
		<div
			className='root material'>
			<style jsx>{`
				.root :global(a){
					text-decoration: none;
					color: inherit;
				}
			`}</style>
			<Wrapper to={url}>
				{featuredImage &&
					<img className='featuredImage'
						srcSet={`${featuredImage.url}?w=200&h=200&fit=fill, ${featuredImage.url}?w=400&h=400&fit=fill 2x`}
						src={`${featuredImage.url}?w=200&h=200&fit=fill`}
					/>
				}
				{title &&
					<div className='title'>
						{title}
					</div>
				}
				{description &&
					<div className='description'>
						{description}
					</div>
				}
			</Wrapper>
		</div>
	)
}
