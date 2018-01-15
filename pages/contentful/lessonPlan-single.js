import App from 'src/components/hoc/app'
import generateUrl from 'src/utils/generateUrl'

import P from 'src/components/pages/lessonPlan'

const Page = props => <P {...props}/>

Page.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const {	locale, contentType, id } = query
	const data = await fetchLocalData(locale, `
		{
			content:${contentType} (id:"${id}"){
				sys { contentTypeId }
				number
				ageGroup {
					title
					cssColor
				}
				coMaterial { title }
				slug
				title
				author {
					name
					organization
				}
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
					...lessonPlanThumb
				}
				nextLessonPlan {
					...lessonPlanThumb
					number
				}
				previousLessonPlan {
					...lessonPlanThumb
					number
				}
				parent:_backrefs {
					entry:lessonPlanCollections__via__lessonPlans {
						title
						slug
						sys { contentTypeId }
						parent:_backrefs {
							entry:lessonPlanGroups__via__lessonPlanCollections {
								title
								slug
								sys { contentTypeId }
							}
						}
					}
				}
			}
		}
		fragment lessonPlanThumb on LessonPlan {
			sys { contentTypeId }
			slug
			title
			description
			featuredImage { url }
			ageGroup {
				title
				cssColor
			}
		}
	`)

	// Metadata
	const meta = {
		ogTitle       : `${data.content.title} - ${appProps.settings.ogTitle}`,
		ogDescription : data.content.description
	}
	if (data.content.featuredImage) {
		meta.ogImage = `https:${data.content.featuredImage.url}`
	}

	// Breadcrumbs
	/*
	const breadcrumbs = { list : [] }
	breadcrumbs.list.push({
		title : appProps.strings.home,
		url   : generateUrl({ appProps })
	})
	if (data.content.parent && data.content.parent.entry && data.content.parent.entry[0] && data.content.parent.entry[0].sys) {
		if (data.content.parent.entry[0].parent && data.content.parent.entry[0].parent.entry && data.content.parent.entry[0].parent.entry[0] && data.content.parent.entry[0].parent.entry[0].sys) {
			breadcrumbs.list.push({
				title : data.content.parent.entry[0].parent.entry[0].title,
				url   : generateUrl({
					appProps,
					contentType : data.content.parent.entry[0].parent.entry[0].sys.contentTypeId,
					slug        : data.content.parent.entry[0].parent.entry[0].slug
				})
			})
		}
		breadcrumbs.list.push({
			title : data.content.parent.entry[0].title,
			url   : generateUrl({
				appProps,
				contentType : data.content.parent.entry[0].sys.contentTypeId,
				slug        : data.content.parent.entry[0].slug
			})
		})
	}
	breadcrumbs.list.push({
		title : `${data.content.number} - ${data.content.title}`
	})
	*/

	// Prepare vocabulary credit
	let vocabularyCreditIndex = 0
	data.content.vocabulary.forEach(definition => {
		definition.creditIndex = definition.credit ? ++vocabularyCreditIndex : null
	})
	data.content.vocabularyCredits = data.content.vocabulary
		.filter(d => d.credit)
		.map(({ credit }, i) => ({
			index : i + 1,
			credit
		}))
	return {
		...data.content,
		...meta,
		// breadcrumbs,
		color  : data.content.ageGroup.cssColor,
		pdfUrl : `/static/pdfs/${data.content.ageGroup.title}_${data.content.coMaterial.title}_${data.content.title}.pdf`,
		hero   : {
			title  : `${data.content.title}`,
			author : `${data.content.author.name} @ ${data.content.author.organization}`,
			color  : data.content.ageGroup.cssColor
		},
		relatedLessonPlans : (data.content.relatedLessonPlans || []).map(item => ({
			...item,
			url : generateUrl({
				appProps,
				contentType : item.sys.contentTypeId,
				slug        : item.slug
			})
		})),
		nextLessonPlan : data.content.nextLessonPlan ? {
			...data.content.nextLessonPlan,
			url : generateUrl({
				appProps,
				contentType : data.content.nextLessonPlan.sys.contentTypeId,
				slug        : data.content.nextLessonPlan.slug
			})
		} : null,
		previousLessonPlan : data.content.previousLessonPlan ? {
			...data.content.previousLessonPlan,
			url : generateUrl({
				appProps,
				contentType : data.content.previousLessonPlan.sys.contentTypeId,
				slug        : data.content.previousLessonPlan.slug
			})
		} : null
	}
}

export default App(Page)
