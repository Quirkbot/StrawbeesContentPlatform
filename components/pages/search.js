import React from 'react'
import Breadcrumbs from 'src/components/breadcrumbs'
import Hero from 'src/components/hero'
import SearchModule from 'src/components/searchModule'
import generateUrl from 'src/utils/generateUrl'

const Component = ({
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
		<div
			className='root searchPage'>
			<style jsx>{`
				.root :global(.hero){
					margin-bottom: 1rem;
				}
			`}</style>
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

Component.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const { locale } = query
	const data = await fetchLocalData(locale, `{
		lessonPlans {
			sys {
				id
				contentTypeId
			}
			title
			slug
			number
			description
			featuredImage { url }
			ageGroup {
				sys { id }
				title
				cssColor
			}
			coMaterial {
				sys { id }
				title
			}
			tags {
				sys { id }
				title
			}
		}

		ageGroups(q:"order=fields.sort") {
			sys { id }
			cssColor
			title
		}

		coMaterials(q:"order=fields.sort") {
			sys { id }
			title
		}

		tags(q:"order=fields.sort") {
			sys { id }
			title
		}
	}`)
	return {
		...data,
		lessonPlans : (data.lessonPlans || []).map(item => ({
			...item,
			tags : item.tags || [],
			url  : generateUrl({
				appProps,
				contentType : item.sys.contentTypeId,
				slug        : item.slug
			})
		}))
	}
}

export default Component
