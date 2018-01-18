import App from 'src/components/hoc/app'
import generateUrl from 'src/utils/generateUrl'

import P from 'src/components/pages/lessonPlan'

const Page = props => <P {...props}/>

Page.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const {	locale, contentType, id } = query
	const data = await fetchLocalData(locale, `
		{
			lessonPlan:${contentType} (id:"${id}"){
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
				relatedLessonPlans {
					sys { contentTypeId }
					slug
					title
					description
					featuredImage { url }
					ageGroups {
						title
						cssColor
					}
				}
			}
		}
	`)
	const { lessonPlan } = data

	// Prepare vocabulary credit
	let vocabularyCreditIndex = 0
	return {
		...lessonPlan,
		// og tags
		ogTitle       : `${lessonPlan.title} - ${appProps.settings.ogTitle}`,
		ogDescription : lessonPlan.description,
		ogImage       : lessonPlan.featuredImage && `https:${lessonPlan.featuredImage.url}`,

		// color
		color : (lessonPlan.ageGroups &&
				lessonPlan.ageGroups.length === 1 &&
				lessonPlan.ageGroups[0].cssColor) || '#ababab',

		// url
		url : generateUrl({
			appProps,
			contentType : lessonPlan.sys.contentTypeId,
			slug        : lessonPlan.slug
		}),

		// hero
		hero : {
			title  : `${lessonPlan.title}`,
			author : `${lessonPlan.author.name} @ ${lessonPlan.author.organization}`,
			color  : (lessonPlan.ageGroups &&
					lessonPlan.ageGroups.length === 1 &&
					lessonPlan.ageGroups[0].cssColor) || '#ababab',
		},

		// vocabulary
		vocabulary : (lessonPlan.vocabulary || []).map(item => ({
			...item,
			creditIndex : item.credit ? ++vocabularyCreditIndex : null
		})),
		vocabularyCredits : lessonPlan.vocabulary.filter(d => d.credit).map(({ credit }, i) => ({
			index : i + 1,
			credit
		})),

		// related lessons
		relatedLessonPlans : (lessonPlan.relatedLessonPlans || []).map(item => ({
			...item,
			url : generateUrl({
				appProps,
				contentType : item.sys.contentTypeId,
				slug        : item.slug
			})
		}))
	}
}

export default App(Page)
