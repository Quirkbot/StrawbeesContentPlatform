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
			.root .featuredImage {
				width: 30rem;
				max-width: 100%;
				margin-bottom: 1rem;
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
				.root .featuredImage {
					width: 5cm;
					order: 2;
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
		{featuredImage &&
			<img className='featuredImage'
				srcSet={`${featuredImage.url}?w=600&fit=fill, ${featuredImage.url}?w=1200&fit=fill 2x`}
				src={`${featuredImage.url}?w=1200&fit=fill`}
			/>
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
