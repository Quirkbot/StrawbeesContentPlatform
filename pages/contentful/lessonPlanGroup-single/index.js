import App from 'src/components/hoc/app'
import Hero from 'src/components/hero'
import LessonPlanGroupListItem from 'src/components/lessonPlanGroupListItem'

const Page = ({ meta, hero }) =>
	<div className='root lessonPlanGroupSinglePage'>
		<Hero {...hero}/>
	</div>

Page.getInitialProps = async ({ query }, fetchLocalData) => {
	const {	locale, contentType, id } = query
	const data = await fetchLocalData(locale, `{
		content:${contentType} (id:"${id}"){
			featuredIcon { url }
			title
			description
		}
	}`)
	return {
		hero : {
			icon        : data.content.featuredIcon,
			title       : data.content.title,
			description : data.content.description
		}
	}
}


export default App(Page)
