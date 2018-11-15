import App from 'src/components/hoc/app'
import applyPropsComputersToList from 'src/utils/applyPropsComputersToList'
import computeOgProps from 'src/utils/computeOgProps'
import computeHeroProps from 'src/utils/computeHeroProps'
import computeCommonContentProps from 'src/utils/computeCommonContentProps'

import P from 'src/components/pages/activity'

const Page = props => <P {...props}/>

Page.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const {	locale, contentType, id } = query
	const { props } = await fetchLocalData(locale, `
		{
			props:${contentType} (id:"${id}"){
				sys { contentTypeId }
				ageGroups {
					title
					cssColor
				}
				slug
				title
				author {
					name
					organization
				}
				video
				featuredImage { url }
				description
				tags { title }
				duration { title }
				groupSize { title }
				overview
				gallery { url }
				materials {
					material {
						title
						featuredImage { url }
						url
					}
					amount
				}
				content {
					... on ContentBlock {
						sys { contentTypeId }
						title
						body
						featuredImage { url }
						imageGallery { url }
						video
					}
					... on Instruction {
						sys { contentTypeId }
						title
						duration
						body
						featuredImage { url }
						imageGallery { url }
						video
					}
				}
				attachments {
					title
					url
				}
				relatedContent {
					... on Page {
						sys { contentTypeId }
						title
						slug
						description
						featuredImage { url }
					}
					... on Activity {
						sys { contentTypeId }
						title
						slug
						description
						featuredImage { url }
						ageGroups {
							title
							cssColor
						}
						tags {
							title
						}
					}
					... on LessonPlan {
						sys { contentTypeId }
						title
						slug
						description
						featuredImage { url }
						ageGroups {
							title
							cssColor
						}
						tags {
							title
						}
					}
				}
			}
		}
	`)
	return {
		...props,
		...computeOgProps(props, appProps),
		...computeCommonContentProps(props, appProps),
		...computeHeroProps(props, appProps),
		relatedContent : applyPropsComputersToList(
			props.relatedContent, appProps,
			[computeCommonContentProps]
		)
	}
}

export default App(Page)
