import Breadcrumbs from 'src/components/breadcrumbs'
import Hero from 'src/components/hero'
import LessonPlanCollectionListItem from 'src/components/lessonPlanCollectionListItem'

export default ({ hero, breadcrumbs, list }) =>
	<div className='root lessonPlanGroupSinglePage'>
		{breadcrumbs &&
			<Breadcrumbs {...breadcrumbs}/>
		}
		{hero &&
			<Hero {...hero}/>
		}
		{list &&
			<div className='list'>
				{list.map((props, i) =>
					<LessonPlanCollectionListItem
						key={i}
						{...props}
					/>
				)}
			</div>
		}
	</div>
