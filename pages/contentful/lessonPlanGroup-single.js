import App from 'src/components/hoc/app'
import generateUrl from 'src/utils/generateUrl'

import P from 'src/components/pages/lessonPlanGroup'

const Page = props => <P {...props}/>

Page.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const { locale, contentType, id } = query
	const data = await fetchLocalData(locale, `{
		content:${contentType} (id:"${id}"){
			ageGroup { cssColor }
			featuredIcon { url }
			title
			slug
			description
			list:lessonPlanCollections {
				sys { contentTypeId }
				slug
				title
				description
				featuredImage { url }
				ageGroup { cssColor }
			}
		}
	}`)
	data.content.list = data.content.list || []
	return {
		breadcrumbs : {
			list : [
				{
					title : appProps.strings.home,
					url   : generateUrl({ appProps })
				},
				{
					title : data.content.title
				}
			]
		},
		hero : {
			icon        : data.content.featuredIcon,
			title       : data.content.title,
			description : data.content.description,
			color       : data.content.ageGroup.cssColor
		},
		list : data.content.list.map(item => ({
			...item,
			url : generateUrl({
				appProps,
				contentType : item.sys.contentTypeId,
				slug        : item.slug
			}),
			color : item.ageGroup.cssColor
		}))
	}
}

export default App(Page)
