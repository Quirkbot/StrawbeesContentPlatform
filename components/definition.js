export default ({
	title,
	description,
	featuredImage
}) =>
	<div
		className='root definition'>
		<style jsx>{`
			.root {
				width: 15rem;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin: 0 0.5rem;
			}
			.root .featuredImage {
				display: block;
			}
			.root .title {
				font-weight: 500;
				font-style: italic;
				font-size: 1.2rem;
			}
			.root .description {
				text-align: center;
			}
		`}</style>
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
	</div>
