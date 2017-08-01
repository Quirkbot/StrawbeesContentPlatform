import Markdown from 'react-remarkable'

export default ({
	appProps,
	title,
	number,
	duration,
	featuredImage,
	body
}) =>
	<div
		className='root lessonStep'>
		{featuredImage &&
			<img className='featuredImage'
				srcSet={`${featuredImage.url}?w=700&fit=fill, ${featuredImage.url}?w=1400&fit=fill 2x`}
				src={`${featuredImage.url}?w=1400&fit=fill`}
			/>
		}
		{title &&
			<div className='title'>
				{`${number}. ${title}`}
			</div>
		}
		{duration &&
			<div className='duration'>
				<span className='key'>{appProps.strings.duration}</span>
				<span className='valye'>{duration}</span>
			</div>
		}
		{body &&
			<div className='body'>
				<Markdown source={body} />
			</div>
		}
	</div>
