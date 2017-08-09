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
				align-items: center;
				margin-bottom: 2rem;
			}
			.root:last-of-type {
				margin-bottom: 0;
			}
			.root .label {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.root .featuredImage {
				width: 2rem;
				height: 2rem;
				margin-right: 1rem;
			}
			.root .title {
				min-width: 8rem;
				margin-right: 1rem;
				font-weight: bold;
				font-style: italic;
				font-size: 1.5rem;
			}
			@media (max-width:600px) {
				.root {
					flex-direction: column;
				}
			}
		`}</style>
		<div className='label'>
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
		</div>
		{description &&
			<div className='description'>
				{description}
			</div>
		}
	</div>
