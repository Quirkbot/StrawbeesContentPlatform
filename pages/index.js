import App from 'src/components/hoc/app'
import computeCommonContentProps from 'src/utils/computeCommonContentProps'

import P from 'src/components/pages/home'

const Page = props => <P {...props}/>

Page.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const { locale } = query
	const props = await fetchLocalData(locale, `{
		lessonPlans (q: "order=-sys.createdAt") {
			sys { contentTypeId }
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
		...props,
		lessonPlans : (props.lessonPlans || []).map(itemProps => ({
			...itemProps,
			...computeCommonContentProps(itemProps, appProps)
		}))
	}
}

export default App(Page)
