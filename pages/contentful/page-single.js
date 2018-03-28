import App from 'src/components/hoc/app'
import computeOgProps from 'src/utils/computeOgProps'
import computeCommonContentProps from 'src/utils/computeCommonContentProps'

import Default from 'src/components/pages/default'
import Search from 'src/components/pages/search'

const resolveTemplate = template => {
	switch (template) {
		case 'search':
			return Search
		default:
			return Default
	}
}

const Page = props => {
	const Template = resolveTemplate(props.template)
	if (Template) {
		return <Template {...props}/>
	}
	return null
}

Page.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const { locale, contentType, id } = query
	const { pros } = await fetchLocalData(locale, `{
		pros:${contentType} (id:"${id}"){
			sys { contentTypeId }
			template
			title
			slug
			description
			featuredImage { url }
			featuredIcon { url }
		}
	}`)
	// Get props from the template
	let templateProps = null
	const Template = resolveTemplate(pros.template)
	if (Template && Template.getInitialProps) {
		templateProps = await Template.getInitialProps({ query }, fetchLocalData, appProps)
	}
	return {
		...pros,
		...computeOgProps(pros, appProps),
		...computeCommonContentProps(pros, appProps),
		...templateProps
	}
}
export default App(Page)
