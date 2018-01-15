import Breadcrumbs from 'src/components/breadcrumbs'
import Hero from 'src/components/hero'
import SearchModule from 'src/components/searchModule'

export default ({
	appProps,
	breadcrumbs,
	hero,
	lessonPlans,
	ageGroups,
	coMaterials,
	tags
}) => {
	const searchModule = {
		appProps,
		lessonPlans,
		ageGroups,
		coMaterials,
		tags
	}

	return (
		<div className='root homePage'>
			{breadcrumbs &&
				<Breadcrumbs {...breadcrumbs}/>
			}
			{hero &&
				<Hero {...hero}/>
			}
			{searchModule &&
				<SearchModule {...searchModule} />
			}
		</div>
	)
}
