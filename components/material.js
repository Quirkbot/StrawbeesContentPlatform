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
				.root :global(>a),
				.root :global(>div){
					width: 15rem;
					text-decoration: none;
					color: inherit;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
				}
				.root :global(.featuredImage) {
					display: block;
				}
				.root :global(.title) {
					font-weight: 500;
					font-style: italic;
					font-size: 1.2rem;
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
