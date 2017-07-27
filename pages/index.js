import App from 'src/components/hoc/app'
import Breadcrumbs from 'src/components/breadcrumbs'
import Hero from 'src/components/hero'
import LessonPlanCollectionListItem from 'src/components/lessonPlanCollectionListItem'
import generateUrl from 'src/utils/generateUrl'

const Page = ({ breadcrumbs, hero, list }) =>
	<div className='root indexPage'>
		{breadcrumbs &&
			<Breadcrumbs {...breadcrumbs}/>
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
	const {	locale } = query
	const data = await fetchLocalData(locale, `{
		content:siteMetas (q: "order=-sys.createdAt&limit=1"){
			heroIcon { url }
			heroTitle
			heroDescription
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
			description : data.content.heroDescription
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
