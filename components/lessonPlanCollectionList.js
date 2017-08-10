import LessonPlanCollectionListItem from 'src/components/lessonPlanCollectionListItem'

export default ({ items }) =>
	<div className='root lessonPlanCollectionList'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				justify-content: center;
				flex-wrap: wrap;
				margin-bottom: 2rem;
			}
			.root :global(.lessonPlanCollectionListItem) {
				margin: 1rem;
			}

		`}</style>
		{items.map((props, i) =>
			<LessonPlanCollectionListItem
				key={i}
				{...props}
			/>
		)}
	</div>
