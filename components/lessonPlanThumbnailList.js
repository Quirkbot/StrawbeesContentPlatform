import LessonPlanThumbnail from 'src/components/lessonPlanThumbnail'

export default ({ items }) =>
	<div className='root lessonPlanThumbnailList'>
		<style jsx>{`
			.root {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				grid-column-gap: 1rem;
				grid-row-gap: 1rem;
				padding-top: 1rem;
				padding-bottom: 1rem;
				max-width: calc(70rem);
				justify-items: center;
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
			/*.root .wrapper {
				display: flex;
				flex-direction: row;
				justify-content: center;
				flex-wrap: wrap;
				max-width: calc(60rem + 2rem);
				padding-top: 0.5rem;
				padding-bottom: 0.5rem;
			}*/
			/*.root :global(.lessonPlanThumbnail) {
				margin: 0.5rem;
			}*/

		`}</style>

		{items.map((props, i) =>
			<LessonPlanThumbnail
				key={i}
				{...props}
			/>
		)}
	</div>
