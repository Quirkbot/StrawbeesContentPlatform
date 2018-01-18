import App from 'src/components/hoc/app'
import generateUrl from 'src/utils/generateUrl'

import P from 'src/components/pages/home'

const Page = props => <P {...props}/>

Page.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const { locale } = query
	const data = await fetchLocalData(locale, `{
		lessonPlans (q: "order=-sys.createdAt") {
			sys {
				id
				contentTypeId
			}
			title
			slug
			description
			featuredImage { url }
			ageGroups {
				sys { id }
				title
				cssColor
			}
			tags {
				sys { id }
				title
			}
		}

		ageGroups(q:"order=fields.sort") {
			sys { id }
			title
			cssColor
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
			color : (item.ageGroups &&
					item.ageGroups.length === 1 &&
					item.ageGroups[0].cssColor) || '#ababab',
			url : generateUrl({
				appProps,
				contentType : item.sys.contentTypeId,
				slug        : item.slug
			})
		}))
	}
}

export default App(Page)
