export default ({
	title,
	description,
	country
}) =>
	<div
		className='root nationalStandard'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: flex-start;
				margin-bottom: 2rem;
			}
			.root:last-of-type {
				margin-bottom: 0;
			}
			.root .country {
				width: 2rem;
				height: 2rem;
				margin-right: 0.5rem;
			}
			.root .text {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
			}

			.root .text .title {
				min-width: 8rem;
				margin-right: 1rem;
				font-weight: bold;
				font-style: italic;
				font-size: 1rem;
			}
			@media screen and (max-width:600px) {
				.root {
					flex-direction: column;
				}
			}
		`}</style>
		{country &&
			<img className='country'
				src={`${country.featuredImage.url}?w=100&h=100&fit=fill`}
			/>
		}
		<div className='text'>
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
	</div>
