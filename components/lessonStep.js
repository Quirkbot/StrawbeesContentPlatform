import Markdown from 'react-remarkable'

import Slider from 'src/components/slider'

export default ({
	appProps,
	title,
	number,
	duration,
	featuredImage,
	imageGallery,
	body
}) =>
	<div
		className='root lessonStep'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;
				margin-bottom: 3rem;
			}
			.root:last-of-type {
				margin-bottom: 0;
			}
			.root .images {
				width: 30rem;
				max-width: 100%;
			}
			.root .images .featuredImage,
			.root .images .gallery {
				width: 100%;
				margin-bottom: 1rem;
			}
			.root .images .gallery-print {
				display: none;
			}
			.root .title {
				text-align: center;
				font-weight: bold;
				font-style: italic;
				font-size: 1rem;
			}
			.root .duration {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
			.root .duration .key{
				font-weight: bold;
				margin-right: 0.5rem;
			}
			.root .body :global(>div >span) {
				display: block;
			}
			.root .body :global(>div >span ul) {
				padding-left: 2rem;
			}
			.root .body :global(>div >span >ul) {
				padding-left: 1rem;
			}
			@media print {
				.root {
					flex-direction: row;
					align-items: flex-start;
					margin-bottom: 0;
				}
				.root .text {
					margin-right: 1cm;
				}
				.root .images  {

					order: 2;
				}
				.root .images .featuredImage,
				.root .images .gallery-print {
					width: 5cm;
				}
				.root .images .gallery {
					display: none;
				}
				.root .images .gallery-print {
					display: flex;
					flex-direction: column;
					position: relative;
				}
				.root .images .gallery-print > * {
					width: 100%;
					margin-bottom: 0.5rem;
				}
				.root .images .gallery-print img {
					display: block;
					width: 100%;
				}
				.root .title {
					text-align: left;
				}
				.root .duration {
					justify-content: flex-start;
				}
				/*.root {
					align-items: flex-start;
				}
				.root .featuredImage {
					width: auto;
					max-height: 8cm;
				}*/

			}

		`}</style>
		{(featuredImage || imageGallery) &&
			<div className='images'>
				{featuredImage &&
					<img className='featuredImage'
						srcSet={`${featuredImage.url}?w=600&fit=fill, ${featuredImage.url}?w=1200&fit=fill 2x`}
						src={`${featuredImage.url}?w=1200&fit=fill`}
					/>
				}
				{imageGallery &&
					<div className='gallery'>
						<Slider options={{
							infiniteLoop   : false,
							autoPlay       : false,
							showIndicators : imageGallery.length > 1
						}}>
							{imageGallery.map(({ url }, i) =>
								<div key={i}>
									<img srcSet={`${url}?w=500&h=500&fit=fill, ${url}?w=1000&h=1000&fit=fill 2x`}
										src={`${url}?w=1000&h=1000&fit=fill`}
									/>
								</div>
							)}
						</Slider>
					</div>
				}
				{imageGallery &&
					<div className='gallery-print'>
						{imageGallery.map(({ url }, i) =>
							<div key={i}>
								<img srcSet={`${url}?w=500&h=500&fit=fill, ${url}?w=1000&h=1000&fit=fill 2x`}
									src={`${url}?w=1000&h=1000&fit=fill`}
								/>
							</div>
						)}
					</div>
				}
			</div>
		}
		<div className='text'>
			{title &&
				<div className='title'>
					{`${number}. ${title}`}
				</div>
			}
			{duration &&
				<div className='duration'>
					<div className='key'>{appProps.strings.duration}:</div>
					<div className='value'>{appProps.strings.minutes.split('{{minutes}}').join(duration)}</div>
				</div>
			}
			{body &&
				<div className='body'>
					<Markdown source={body} />
				</div>
			}
		</div>
	</div>
