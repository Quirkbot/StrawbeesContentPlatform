import Markdown from 'react-remarkable'
import Slider from 'src/components/slider'

export default ({
	duration = '',
	durationLabel = '',
	groupSize = '',
	groupSizeLabel = '',
	classSize = '',
	classSizeLabel = '',
	overview = '',
	overviewLabel = '',
	gallery = []
}) =>
	<div
		className='root contentInitialInfo'>
		<style jsx>{`
			.root {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			.wrapper {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				grid-column-gap: 1rem;
				grid-row-gap: 1rem;
				padding-top: 1rem;
				padding-bottom: 1rem;
				max-width: 60rem;
				justify-items: center;
			}
			.info {
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
			.info .row {
				display: flex;
				flex-direction: row;
				align-items: baseline;
			}
			.info .row > * {
				margin: 0;
			}
			.info .row .key {
				margin-right: 1rem;
			}
			.info .overview .key {
				margin-bottom: 0;
			}
			.info .overview :global(p:first-child) {
				margin-top: 0;
			}
			.info .overview :global(p:last-child) {
				margin-bottom: 0;
			}
			.images .gallery-print {
				display: none;
			}
			@media screen and (max-width: 1000px) {
				.wrapper {
					max-width: 100%;
					padding: 1rem;
				}
			}
			@media screen and (max-width: 700px) {
				.wrapper {
					display: flex;
					flex-direction: column;
					padding: 0rem;
				}
				.info {
					padding: 1rem;
				}
			}
			@media print {
				.info {
					justify-content: flex-start;
				}
				.images .gallery {
					display: none;
				}
				.images .gallery-print {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					grid-column-gap: 1rem;
					grid-row-gap: 1rem;
				}
				.images .gallery-print img {
					display: block;
					width: 100%;
				}
			}
		`}</style>
		<div className='wrapper'>
			<div className='info'>
				{duration &&
					<div className='row'>
						{durationLabel &&
							<h3 className='key'>
								{durationLabel}
							</h3>
						}
						<p className='value'>{duration}</p>
					</div>
				}
				{classSize &&
					<div className='row'>
						{classSizeLabel &&
							<h3 className='key'>
								{classSizeLabel}
							</h3>
						}
						<p className='value'>
							{classSize}
						</p>
					</div>
				}
				{groupSize &&
					<div className='row'>
						{groupSizeLabel &&
							<h3 className='key'>
								{groupSizeLabel}
							</h3>
						}
						<p className='value'>
							{groupSize}
						</p>
					</div>
				}
				{overview &&
					<div className='overview'>
						{overviewLabel &&
							<h3 className='key'>
								{overviewLabel}
							</h3>
						}
						<Markdown source={overview}/>
					</div>
				}
			</div>
			<div className='images'>
				{gallery &&
					<div className='gallery'>
						<Slider>
							{gallery.map(({ url }, i) =>
								<div key={i}>
									<img srcSet={`${url}?w=500&h=500&fit=fill, ${url}?w=1000&h=1000&fit=fill 2x`}
										src={`${url}?w=1000&h=1000&fit=fill`}
									/>
								</div>
							)}
						</Slider>
					</div>
				}
				{gallery &&
					<div className='gallery-print'>
						{gallery.map(({ url }, i) =>
							<div key={i}>
								<img srcSet={`${url}?w=500&h=500&fit=fill, ${url}?w=1000&h=1000&fit=fill 2x`}
									src={`${url}?w=1000&h=1000&fit=fill`}
								/>
							</div>
						)}
					</div>
				}
			</div>
		</div>
	</div>
