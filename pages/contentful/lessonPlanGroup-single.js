import App from 'src/components/hoc/app'
import Breadcrumbs from 'src/components/breadcrumbs'
import Hero from 'src/components/hero'
import LessonPlanCollectionListItem from 'src/components/lessonPlanCollectionListItem'
import generateUrl from 'src/utils/generateUrl'

const Page = ({ appProps, hero, breadcrumbs, list }) =>
	<div className='root lessonPlanGroupSinglePage'>
		{breadcrumbs &&
			<Breadcrumbs {...{
				appProps,
				breadcrumbs
			}}/>
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

Page.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const {	locale, contentType, id } = query
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
		breadcrumbs : [
			{
				title : appProps.strings.home,
				url   : generateUrl({ appProps })
			},
			{
				title : data.content.title,
				url   : generateUrl({ appProps, contentType, slug : data.content.slug })
			}
		],
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
