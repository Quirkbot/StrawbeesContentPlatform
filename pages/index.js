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
			list:featuredLessonPlanGroups {
				sys { contentTypeId }
				slug
				title
				description
				featuredImage { url }
				ageGroup { cssColor }
			}
		}
	}`)
	data.content = data.content.pop()
	return {
		...data.content,
		breadcrumbs : {
			list : [
				{
					title : appProps.strings.home,
					url   : generateUrl({ appProps })
				}
			]
		},
		hero : {
			icon        : data.content.heroIcon,
			title       : data.content.heroTitle,
			description : data.content.heroDescription,
			buttonUrl   : generateUrl({
				appProps,
				contentType : data.content.searchPage.sys.contentTypeId,
				slug        : data.content.searchPage.slug
			}),
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
