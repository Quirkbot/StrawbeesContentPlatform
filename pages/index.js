import App from 'src/components/hoc/app'
import Hero from 'src/components/hero'
import LessonPlanGroupListItem from 'src/components/lessonPlanGroupListItem'

const Page = ({ meta, hero, lessonPlanGroups }) =>
	<div className='root indexPage'>
		<Hero {...hero}/>
		<div className='lessonPlanGroups'>
			{lessonPlanGroups.map((data, i) =>
				<LessonPlanGroupListItem
					key={i}
					{...{ meta }}
					{...data}
				/>
			)}
		</div>
	</div>

Page.getInitialProps = async ({ query }, fetchLocalData) => {
	const {	locale, contentType, id } = query
	const localData = await fetchLocalData(locale, `{
		siteMetas (q: "order=-sys.createdAt&limit=1"){
			heroIcon { url }
			heroTitle
			heroDescription
			featuredLessonPlanGroups {
				slug
				title
				description
				featuredImage { url }
				ageGroup { title }
			}
		}
	}`)
	const data = localData.siteMetas.pop()

	return {
		hero : {
			icon        : data.heroIcon,
			title       : data.heroTitle,
			description : data.heroDescription
		},
		lessonPlanGroups : data.featuredLessonPlanGroups
	}
}


export default App(Page)
