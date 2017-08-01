export default ({
	title,
	description,
	featuredImage
}) =>
	<div
		className='root definition'>
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
