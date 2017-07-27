import App from 'src/components/hoc/app'
import Breadcrumbs from 'src/components/breadcrumbs'
import Hero from 'src/components/hero'
import generateUrl from 'src/utils/generateUrl'

const Page = ({ hero, breadcrumbs }) =>
	<div className='root lessonPlanSinglePage'>
		{breadcrumbs &&
			<Breadcrumbs {...breadcrumbs}/>
		}
		{hero &&
			<Hero {...hero}/>
		}
	</div>

Page.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const {	locale, contentType, id } = query
	const data = await fetchLocalData(locale, `{
		content:${contentType} (id:"${id}"){
			ageGroup { cssColor }
			slug
			title
			description
			parent:_backrefs {
				entry:lessonPlanCollections__via__lessonPlans {
					title
					slug
					sys { contentTypeId	}
					parent:_backrefs {
						entry:lessonPlanGroups__via__lessonPlanCollections {
							title
							slug
							sys { contentTypeId	}
						}
					}
				}
			}
		}
	}`)
	return {
		breadcrumbs : {
			list : [
				{
					title : appProps.strings.home,
					url   : generateUrl({ appProps })
				},
				{
					title : data.content.parent.entry[0].parent.entry[0].title,
					url   : generateUrl({
						appProps,
						contentType : data.content.parent.entry[0].parent.entry[0].sys.contentTypeId,
						slug        : data.content.parent.entry[0].parent.entry[0].slug
					})
				},
				{
					title : data.content.parent.entry[0].title,
					url   : generateUrl({
						appProps,
						contentType : data.content.parent.entry[0].sys.contentTypeId,
						slug        : data.content.parent.entry[0].slug
					})
				},
				{
					title : data.content.title,
					url   : generateUrl({ appProps, contentType, slug : data.content.slug })
				}
			]
		},
		hero : {
			title       : data.content.title,
			description : data.content.description
		}
	}
}

export default App(Page)
