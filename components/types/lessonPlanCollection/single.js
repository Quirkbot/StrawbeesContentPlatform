import Page from '../../page'
import LessonPlanListItem from '../../lessonPlanListItem'
export default ({ data, asPath }) =>
	<Page>
		{data.fields.title}
		{data.fields.lessonPlans.map(lessonPlan =>
			<LessonPlanListItem
				key={lessonPlan.id}
				data={lessonPlan}
				asPath={asPath}
			/>
		)}
	</Page>
