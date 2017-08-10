import LessonPlanListItem from 'src/components/lessonPlanListItem'

export default ({ items }) =>
	<div className='root lessonPlanList'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				justify-content: center;
				flex-wrap: wrap;
				margin-bottom: 2rem;
			}
			.root :global(.lessonPlanListItem) {
				margin: 1rem;
			}

		`}</style>
		{items.map((props, i) =>
			<LessonPlanListItem
				key={i}
				{...props}
			/>
		)}
	</div>
