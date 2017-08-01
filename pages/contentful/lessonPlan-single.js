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
				}
				vocabulary {
					title
					description
					featuredImage { url }
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
	return {
		...data.content,
		color       : data.content.ageGroup.cssColor,
		pdfUrl      : `/static/pdfs/${data.content.ageGroup.title}_${data.content.coMaterial.title}_${data.content.title}.pdf`,
		breadcrumbs : {
			list : [
				{
					title : appProps.strings.home,
					url   : generateUrl({ appProps })
				},
				{
					title : data.content.parent.entry[0].parent.entry[0].title,
					url   : generateUrl({
						appProps,
						contentType : data.content.parent.entry[0].parent.entry[0].sys.contentTypeId,
						slug        : data.content.parent.entry[0].parent.entry[0].slug
					})
				},
				{
					title : data.content.parent.entry[0].title,
					url   : generateUrl({
						appProps,
						contentType : data.content.parent.entry[0].sys.contentTypeId,
						slug        : data.content.parent.entry[0].slug
					})
				},
				{
					title : data.content.title,
					url   : generateUrl({ appProps, contentType, slug : data.content.slug })
				}
			]
		},
		hero : {
			title  : data.content.title,
			author : `${data.content.author.name} @ ${data.content.author.organization}`,
			color  : data.content.ageGroup.cssColor
		},
		relatedLessonPlans : (data.content.relatedLessonPlans || []).map(item => ({
			...item,
			url : generateUrl({
				appProps,
				contentType : item.sys.contentTypeId,
				slug        : item.slug
			}),
			label : item.ageGroup.title,
			color : item.ageGroup.cssColor
		})),
		nextLessonPlan : data.content.nextLessonPlan ? {
			...data.content.nextLessonPlan,
			url : generateUrl({
				appProps,
				contentType : data.content.nextLessonPlan.sys.contentTypeId,
				slug        : data.content.nextLessonPlan.slug
			}),
			label : data.content.nextLessonPlan.ageGroup.title,
			color : data.content.nextLessonPlan.ageGroup.cssColor
		} : null
	}
}

export default App(Page)
