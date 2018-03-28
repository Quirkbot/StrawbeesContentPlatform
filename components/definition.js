export default ({
	title,
	description,
	featuredImage,
	creditIndex
}) =>
	<div
		className='root definition'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.root .featuredImage {
				display: block;
			}
			.root .title {
				font-weight: 500;
				font-style: italic;
				font-size: 1rem;
			}
			.root .description {
				text-align: center;
				font-size: 0.8rem;
			}
			.root .description .creditIndex {
				display: inline;
				font-size: 0.7rem;
			}
			.root .description .creditIndex::before {
				content: '(';
			}
			.root .description .creditIndex::after {
				content: ')';
			}
			@media print {
				.root {
					page-break-inside: avoid;
				}
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
				{creditIndex &&
					<div className='creditIndex'>
						{creditIndex}
					</div>
				}
			</div>
		}
	</div>
