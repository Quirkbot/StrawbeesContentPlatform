/* global SPACE_ID */

import pluralize from 'pluralize'
import App from 'src/components/hoc/app'
import P from 'src/components/pages/translationStatus'
import contentTypes from 'src/static/content-types.json'

const Page = props => <P {...props}/>

Page.getInitialProps = async ({ query }, fetchLocalData) => {
	const { locale } = query

	const structure = contentTypes
		.map(({ sys, name, fields }) => ({
			name,
			id     : sys.id,
			fields : fields
				.filter(f => f.localized && (f.type === 'Symbol' || f.type === 'Text'))
				.map(({ name, id }) => ({
					name,
					id
				}))
		}))
		.filter(o => o.fields.length)

	const graphqlQuery = `{
		${structure.map(type => `
			${type.id}:${pluralize(type.id)} {
				sys { id }
				${type.fields.map(({ id }) => `${id}`).join(' ')}
			}
		`).join('')}
	}`
	const englishData = await fetchLocalData('en', graphqlQuery)
	const localData = await fetchLocalData(locale, graphqlQuery)

	const sortByStatus = (a, b) => {
		if (a.status === b.status) {
			return 0
		}
		if (a.status === 'missing') {
			return -1
		}
		if (a.status === 'not-used') {
			if (b.status === 'missing') {
				return 1
			}
			return -1
		}
		if (a.status === 'translated') {
			return 1
		}
		return 0
	}

	const setContentfulUrl = entry =>
		entry.contentfulUrl = `https://app.contentful.com/spaces/${SPACE_ID}/entries/${entry.sys.id}`

	structure.forEach(typeStructure => {
		const {
			id     : typeId,
			fields : typeFields
		} = typeStructure
		const englishEntries = englishData[typeId]
		const localEntries = localData[typeId]
		let typeStatus = 'translated'
		englishEntries.forEach((englishEntry, entryIndex) => {
			const localEntry = localEntries[entryIndex]
			setContentfulUrl(englishEntry)
			setContentfulUrl(localEntry)
			let entryStatus = 'translated'
			typeFields.map(({ id : fieldId }) => {
				const englishField = englishEntry[fieldId]
				const localField = localEntry[fieldId]
				let fieldStatus = !englishField ? 'not-used' : englishField === localField ? 'missing' : 'translated'
				if (locale === 'en' && fieldStatus === 'missing') {
					fieldStatus = 'translated'
				}
				if (entryStatus === 'translated' && fieldStatus === 'not-used') {
					entryStatus = fieldStatus
				}
				if ((entryStatus === 'translated' || entryStatus === 'not-used') && fieldStatus === 'missing') {
					entryStatus = fieldStatus
				}
				if (typeStatus === 'translated' && fieldStatus === 'not-used') {
					typeStatus = fieldStatus
				}
				if ((typeStatus === 'translated' || typeStatus === 'not-used') && fieldStatus === 'missing') {
					typeStatus = fieldStatus
				}

				englishEntry[fieldId] = {
					value  : englishField,
					status : fieldStatus
				}
				localEntry[fieldId] = {
					value  : localField,
					status : fieldStatus
				}
				return null
			})
			englishEntry.status = entryStatus
			localEntry.status = entryStatus
		})
		typeStructure.status = typeStatus
		englishEntries.sort(sortByStatus)
		localEntries.sort(sortByStatus)
	})
	//structure.sort(sortByStatus)

	const lessonPlanQuery = `{
		lessonPlanGroups {
			sys { id }
			ageGroup {
				sys { id }
				title
			}
			title
			slug
			description
			lessonPlanCollections {
				sys { id }
				title
				slug
				description
				lessonPlans {
					sys { id }
					number
					coMaterial {
						sys { id }
						title
					}
					slug
					title
					author {
						sys { id }
						name
						organization
					}
					description
					tags {
						sys { id }
						title
					}
					duration {
						sys { id }
						title
					}
					classSize {
						sys { id }
						title
					}
					groupSize {
						sys { id }
						title
					}
					overview
					materials {
						sys { id }
						material {
							sys { id }
							title
						}
						amount
					}
					modifications {
						sys { id }
						title
						body
					}
					learningObjectives {
						sys { id }
						body
					}
					nationalStandards {
						sys { id }
						title
						description
						country {
							sys { id }
							title
						}
					}
					teachingAssessment
					preparation {
						sys { id }
						body
					}
					lessonSteps {
						sys { id }
						title
						duration
						body
					}
					vocabulary {
						sys { id }
						title
						description
					}
					attachments {
						sys { id }
						title
					}
				}
			}
		}
	}`
	const englishLessonPlans = await fetchLocalData(locale, lessonPlanQuery)
	const localLessonPlans = await fetchLocalData(locale, lessonPlanQuery)

	const parseLessonObjects = (english, local) => {
		if (typeof english === 'undefined' || english === null) {
			return 'not-used'
		}
		if (Array.isArray(english)) {
			english.forEach((englishItem, i) => {
				const localItem = local[i]
				return parseLessonObjects(englishItem, localItem)
			})
			return
		}
		if (typeof english === 'object') {
			let objectStatus = 'translated'
			if (typeof english.sys !== 'undefined') {
				setContentfulUrl(english)
				setContentfulUrl(local)
				delete english.sys
				delete local.sys
			}
			Object.keys(english)
				.filter(key => key !== 'sys')
				.filter(key => key !== 'contentfulUrl')
				.forEach(key => {
					const englishField = english[key]
					const localField = local[key]
					if (typeof english[key] === 'string' || typeof english[key] === 'number') {
						let status = !englishField ? 'not-used' : englishField === localField ? 'missing' : 'translated'
						if (locale === 'en' && status === 'missing') {
							status = 'translated'
						}
						if (objectStatus === 'translated' && status === 'not-used') {
							objectStatus = status
						}
						if ((objectStatus === 'translated' || objectStatus === 'not-used') && status === 'missing') {
							objectStatus = status
						}
						english[key] = {
							value : englishField,
							status
						}
						local[key] = {
							value        : localField,
							englishValue : englishField,
							localValue   : localField,
							status
						}
						return
					}
					if (english[key] === null) {
						delete english[key]
						delete local[key]
						return
					}
					parseLessonObjects(english[key], local[key])
				})
			english.status = objectStatus
			local.status = objectStatus
		}
	}
	parseLessonObjects(englishLessonPlans, localLessonPlans)
	const lessonPlans = localLessonPlans.lessonPlanGroups
	return {
		lessonPlans,
		structure,
		englishData,
		localData
	}
}

export default App(Page)
