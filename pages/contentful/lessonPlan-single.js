import App from 'src/components/hoc/app'
import applyPropsComputersToList from 'src/utils/applyPropsComputersToList'
import computeOgProps from 'src/utils/computeOgProps'
import computeHeroProps from 'src/utils/computeHeroProps'
import computeContentInitialInfoProps from 'src/utils/computeContentInitialInfoProps'
import computeCommonContentProps from 'src/utils/computeCommonContentProps'

import P from 'src/components/pages/lessonPlan'

const Page = props => <P {...props}/>

Page.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const { locale, contentType, id } = query
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
				classSize { title }
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
				modifications {
					title
					body
				}
				learningObjectives { body }
				nationalStandards {
					title
					description
					country {
						title
						featuredImage { url }
					}
				}
				teachingAssessment
				preparation { body }
				lessonSteps {
					title
					duration
					body
					featuredImage { url }
					imageGallery { url }
				}
				vocabulary {
					title
					description
					featuredImage { url }
					credit
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

	// Prepare vocabulary credit
	let vocabularyCreditIndex = 0
	return {
		...props,
		...computeOgProps(props, appProps),
		...computeCommonContentProps(props, appProps),
		...computeHeroProps(props, appProps),
		...computeContentInitialInfoProps(props, appProps),

		// related content
		relatedContent : applyPropsComputersToList(
			props.relatedContent, appProps,
			[computeCommonContentProps]
		),

		// vocabulary
		vocabulary : (props.vocabulary || []).map(itemProps => ({
			...itemProps,
			creditIndex : itemProps.credit ? ++vocabularyCreditIndex : null
		})),
		vocabularyCredits : props.vocabulary.filter(d => d.credit).map(({ credit }, i) => ({
			index : i + 1,
			credit
		})),

	}
}

export default App(Page)
