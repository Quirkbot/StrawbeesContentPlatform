import LessonPlanListItem from 'src/components/lessonPlanListItem'

export default ({ items }) =>
	<div className='root lessonPlanList'>
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
				max-width: calc(50rem + 2rem);
			}
			.root :global(.lessonPlanListItem) {
				margin: 1rem;
			}

		`}</style>
		<div className='wrapper'>
			{items.map((props, i) =>
				<LessonPlanListItem
					key={i}
					{...props}
				/>
			)}
		</div>
	</div>
