import Breadcrumbs from 'src/components/breadcrumbs'
import Hero from 'src/components/hero'
import LessonPlanCollectionList from 'src/components/lessonPlanCollectionList'

export default ({ hero, breadcrumbs, list }) =>
	<div className='root lessonPlanGroupSinglePage'>
		{breadcrumbs &&
			<Breadcrumbs {...breadcrumbs}/>
		}
		{hero &&
			<Hero {...hero}/>
		}
		{list &&
			<LessonPlanCollectionList items={list} />
		}
	</div>
