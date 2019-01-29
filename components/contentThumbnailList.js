import ContentThumbnail from 'src/components/contentThumbnail'

export default ({ items }) =>
	<div className='root contentThumbnailList'>
		<style jsx>{`
			.root {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				grid-column-gap: 1rem;
				grid-row-gap: 1rem;
				padding-top: 1rem;
				padding-bottom: 1rem;
				max-width: calc(70rem);
				justify-items: stretch;
			}
			@media screen and (max-width: 70rem) {
				.root {
					padding-left: 1rem;
					padding-right: 1rem;
				}
			}
			@media screen and (max-width: 60rem) {
				.root {
					grid-template-columns: repeat(2, 1fr);
				}
			}
			@media screen and (max-width: 30rem) {
				.root {
					grid-template-columns: repeat(1, 1fr);
				}
			}

		`}</style>

		{items.map((props, i) =>
			<ContentThumbnail
				key={i}
				{...props}
			/>
		)}
	</div>
