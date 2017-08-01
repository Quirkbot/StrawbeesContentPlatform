import Breadcrumbs from 'src/components/breadcrumbs'
import Hero from 'src/components/hero'
import LessonPlanListItem from 'src/components/lessonPlanListItem'

export default ({ hero, breadcrumbs, list }) =>
	<div className='root lessonPlanCollectionSinglePage'>
		{breadcrumbs &&
			<Breadcrumbs {...breadcrumbs}/>
		}
		{hero &&
			<Hero {...hero}/>
		}
		{list &&
			<div className='list'>
				{list.map((props, i) =>
					<LessonPlanListItem
						key={i}
						{...props}
					/>
				)}
			</div>
		}
	</div>
