import Breadcrumbs from 'src/components/breadcrumbs'
import Button from 'src/components/button'
import Hero from 'src/components/hero'
import LessonPlanCollectionList from 'src/components/lessonPlanCollectionList'

export default ({ appProps, breadcrumbs, hero, list }) =>
	<div className='root homePage'>
		{breadcrumbs &&
			<Breadcrumbs {...breadcrumbs}/>
		}
		{hero &&
			<Hero {...hero}>
				<Button
					icon='search'
					title={appProps.strings.searchLessonPlans}
					url={hero.buttonUrl}
				/>
			</Hero>
		}
		{list &&
			<LessonPlanCollectionList items={list} />
		}
	</div>
