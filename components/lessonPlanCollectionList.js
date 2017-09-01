import LessonPlanCollectionListItem from 'src/components/lessonPlanCollectionListItem'

export default ({ items }) =>
	<div className='root lessonPlanCollectionList'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 2rem;
			}
			.root .wrapper {
				display: flex;
				flex-direction: row;
				justify-content: center;
				flex-wrap: wrap;
				max-width: calc(60rem + 2rem);
			}
			.root :global(.lessonPlanCollectionListItem) {
				margin: 1rem;
			}

		`}</style>
		<div className='wrapper'>
			{items.map((props, i) =>
				<LessonPlanCollectionListItem
					key={i}
					{...props}
				/>
			)}
		</div>
	</div>
