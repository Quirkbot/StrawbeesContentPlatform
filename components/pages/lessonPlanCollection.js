import Breadcrumbs from 'src/components/breadcrumbs'
import Hero from 'src/components/hero'
import LessonPlanList from 'src/components/lessonPlanList'

export default ({ hero, breadcrumbs, list }) =>
	<div className='root lessonPlanCollectionSinglePage'>
		{breadcrumbs &&
			<Breadcrumbs {...breadcrumbs}/>
		}
		{hero &&
			<Hero {...hero}/>
		}
		{list &&
			<LessonPlanList items={list}/>
		}
	</div>
