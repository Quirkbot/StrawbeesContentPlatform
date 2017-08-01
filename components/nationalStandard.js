export default ({
	title,
	description,
	country
}) =>
	<div
		className='root nationalStandard'>
		{country &&
			<img className='featuredImage'
				src={`${country.featuredImage.url}?w=100&h=100&fit=fill`}
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
