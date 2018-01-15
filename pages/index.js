import App from 'src/components/hoc/app'
import generateUrl from 'src/utils/generateUrl'

import P from 'src/components/pages/home'

const Page = props => <P {...props}/>

Page.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const { locale } = query
	const data = await fetchLocalData(locale, `{
		content:settings (q: "order=-sys.createdAt&limit=1"){
			heroIcon { url }
			heroTitle
			heroDescription
			searchPage {
				slug
				sys { contentTypeId }
			}
		}

		lessonPlans (q: "order=-sys.createdAt") {
			sys {
				id
				contentTypeId
			}
			title
			slug
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
			title
			cssColor
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
	data.content = data.content.pop()
	return {
		...data,
		// breadcrumbs : {
		// 	list : [
		// 		{
		// 			title : appProps.strings.home
		// 		}
		// 	]
		// },
		// hero : {
		// 	icon        : data.content.heroIcon,
		// 	title       : data.content.heroTitle,
		// 	description : data.content.heroDescription,
		// 	buttonUrl   : generateUrl({
		// 		appProps,
		// 		contentType : data.content.searchPage.sys.contentTypeId,
		// 		slug        : data.content.searchPage.slug
		// 	}),
		// },
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

export default App(Page)
