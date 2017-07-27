import App from 'src/components/hoc/app'
import Breadcrumbs from 'src/components/breadcrumbs'
import Hero from 'src/components/hero'
import LessonPlanListItem from 'src/components/lessonPlanListItem'
import generateUrl from 'src/utils/generateUrl'

const Page = ({ hero, breadcrumbs, list }) =>
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

Page.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const {	locale, contentType, id } = query
	const data = await fetchLocalData(locale, `{
		content:${contentType} (id:"${id}"){
			ageGroup { cssColor }
			featuredIcon { url }
			title
			slug
			description
			list:lessonPlans {
				sys { contentTypeId }
				slug
				title
				description
				featuredImage { url }
				ageGroup { cssColor }
			}
			parent:_backrefs {
				entry:lessonPlanGroups__via__lessonPlanCollections {
					title
					slug
					sys {
						contentTypeId
					}
				}
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
			icon        : data.content.featuredIcon,
			title       : data.content.title,
			subtitle    : appProps.strings.lessonPlanCollection,
			description : data.content.description,
			color       : data.content.ageGroup.cssColor
		},
		list : data.content.list.map((item, i) => ({
			...item,
			url : generateUrl({
				appProps,
				contentType : item.sys.contentTypeId,
				slug        : item.slug
			}),
			color  : item.ageGroup.cssColor,
			number : i + 1
		}))
	}
}

export default App(Page)
