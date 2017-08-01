import React from 'react'
import Head from 'next/head'

import LocalesMenu from 'src/components/localesMenu'
import fetchLocalData from 'src/utils/fetchLocalData'

export default Child => class App extends React.Component {
	static async getInitialProps(ctx) {
		// Retrieve props that will be used app wise
		const {	locale } = ctx.query
		const localData = await fetchLocalData(locale, `{
			settings(q: "order=-sys.createdAt&limit=1"){
				locale
				languageName
				basename
				availableLocales
				storeUrl
			}

			contentTypeSlugs(q: "order=-sys.createdAt&limit=1"){
				lessonPlan
				lessonPlanCollection
				lessonPlanGroup
				definition
				material
			}

			textStrings(q: "order=-sys.createdAt&limit=1"){
				content
				home
				searchLessonPlans
				more
				author
				duration
				classSize
				groupSize
				overview
				materials
				shop
				modifications
				learningObjectives
				nationalStandards
				teachingAssessment
				preparation
				lessonSteps
				vocabulary
				attachments
				saveAsPrintableFile
				download
				relatedLessons
				nextLesson
				all
				previousLesson
				foundLessons
				noLessonsFound
				ageGroup
				coMaterial
				tag
				lessonPlan
				lessonPlanCollection
				companyAddress
				copyrightNotice
			}
		}`)
		const settings = localData.settings.shift()
		const strings = localData.textStrings.shift()
		const contentTypeSlugs = localData.contentTypeSlugs.shift()

		settings.currentLocale = {
			locale       : settings.locale,
			languageName : settings.languageName,
			basename     : settings.basename ? settings.basename : ''
		}
		settings.availableLocales = settings.availableLocales.map(line => {
			const array = line.split('_')
			return {
				locale       : array[0],
				languageName : array[1],
				basename     : array[2] ? array[2] : ''
			}
		})
		delete settings.locale
		delete settings.languageName
		delete settings.basename

		const appProps = {
			settings,
			contentTypeSlugs,
			strings
		}
		// Retrive props of the current page
		const pageProps = await Child.getInitialProps(ctx, fetchLocalData, appProps)
		return {
			appProps,
			...pageProps
		}
	}

	render() {
		return (
			<div>
				<Head></Head>
				<LocalesMenu {...this.props.appProps}/>
				<Child {...this.props} />
				<h4>This is the footer</h4>
			</div>
		)
	}
}
