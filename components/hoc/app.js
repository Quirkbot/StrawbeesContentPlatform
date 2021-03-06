/* global GAID, GTMID, CANONICAL_URL, STAGE */
import React from 'react'
import ReactGA from 'react-ga'
import NProgress from 'nprogress'
import Head from 'next/head'
import Router from 'next/router'
import Header from 'src/components/header'
import Footer from 'src/components/footer'

import fetchLocalData from 'src/utils/fetchLocalData'

export default Child => class App extends React.Component {
	static async getInitialProps(ctx) {
		// Retrieve props that will be used app wise
		const { locale } = ctx.query
		const context = {
			query  : ctx.query,
			asPath : ctx.asPath
		}
		const localData = await fetchLocalData(locale, `{
			settings (q : "order=-sys.createdAt", limit : 1) {
				locale
				languageName
				basename
				locales
				storeUrl
				logo { url }
				socialMediaLinks
				mainMenuLinks
				ogImage { url }
				ogTitle
				ogDescription
			}

			contentTypeSlugs (q : "order=-sys.createdAt", limit : 1){
				activity
				definition
				instruction
				lessonPlan
				material
				page
			}

			contentTypeTitles (q : "order=-sys.createdAt", limit : 1){
				activity
				definition
				instruction
				lessonPlan
				material
				page
			}

			textStrings(q: "order=-sys.createdAt", limit : 1){
				ageGroup
				all
				attachments
				author
				classSize
				coMaterial
				companyAddress
				content
				copyrightNotice
				credits
				download
				duration
				emptySearch
				foundLessons
				groupSize
				home
				learningObjectives
				lessonPlan
				lessonPlanCollection
				lessonSteps
				materials
				minutes
				modifications
				more
				nationalStandards
				nextLesson
				noLessonsFound
				overview
				preparation
				previousLesson
				print
				printFriendly
				relatedLessons
				saveAsPrintableFile
				searchFieldPlaceholder
				searchFilters
				searchLessonPlans
				shop
				tag
				teachingAssessment
				vocabulary
			}
		}`)
		const settings = localData.settings.shift()
		const strings = localData.textStrings.shift()
		const contentTypeSlugs = localData.contentTypeSlugs.shift()
		const contentTypeTitles = localData.contentTypeTitles.shift()

		settings.currentLocale = {
			locale       : settings.locale,
			languageName : settings.languageName,
			basename     : settings.basename ? settings.basename : ''
		}
		delete settings.locale
		delete settings.languageName
		delete settings.basename


		settings.locales = JSON.parse(settings.locales).filter(localeObject => {
			if (typeof STAGE !== 'undefined') {
				return true
			}
			return !localeObject.stage
		})

		settings.socialMediaLinks = settings.socialMediaLinks.map(line => {
			const array = line.split('_')
			const [title, ...rest] = array
			const url = rest.join('_')
			return {
				title,
				url
			}
		})

		settings.mainMenuLinks = settings.mainMenuLinks.map(line => {
			const array = line.split('_')
			const [title, ...rest] = array
			const url = rest.join('_')
			return {
				title,
				url
			}
		})

		const appProps = {
			context,
			settings,
			contentTypeSlugs,
			contentTypeTitles,
			strings
		}

		const meta = {
			ogTitle       : settings.ogTitle,
			ogDescription : settings.ogDescription,
			ogImage       : settings.ogImage && `https:${settings.ogImage.url}`
		}
		// Retrive props of the current page
		const pageProps = await Child.getInitialProps(ctx, fetchLocalData, appProps)
		return {
			appProps,
			...meta,
			...pageProps
		}
	}

	constructor(props) {
		super(props)
		this.trackPageview = this.trackPageview.bind(this)
	}

	componentDidMount() {
		this.initGa()
		this.trackPageview()
		Router.router.events.on('routeChangeComplete', this.trackPageview)
		Router.router.events.on('routeChangeStart', NProgress.start)
		Router.router.events.on('routeChangeComplete', NProgress.done)
		Router.router.events.on('routeChangeError', NProgress.done)
	}

	componentWillUnmount() {
		Router.router.events.off('routeChangeComplete', this.trackPageview)
		Router.router.events.off('routeChangeStart', NProgress.start)
		Router.router.events.off('routeChangeComplete', NProgress.done)
		Router.router.events.off('routeChangeError', NProgress.done)
	}

	trackPageview(path = document.location.pathname) {
		if (path !== this.lastTrackedPath) {
			ReactGA.pageview(path)
			this.lastTrackedPath = path
		}
	}

	initGa() {
		if (!window.GA_INITIALIZED) {
			ReactGA.initialize(GAID)
			window.GA_INITIALIZED = true
		}
	}

	render() {
		const ga = {
			trackPageview : this.trackPageview
		}
		const baseUrl = typeof CANONICAL_URL !== 'undefined' ? CANONICAL_URL : ''

		const meta = {
			'og:url'         : baseUrl ? `${baseUrl}${this.props.appProps.context.asPath}` : '',
			'og:title'       : this.props.ogTitle,
			'og:description' : this.props.ogDescription,
			'og:image'       : this.props.ogImage,
			'og:type'        : 'website'
		}

		return (
			<div className='root app'>
				<style jsx>{`
					/* This stylesheet generated by Transfonter (https://transfonter.org) on August 4, 2017 2:45 PM */
					@font-face { font-family: 'Brandon Text'; src: url('/static/fonts/BrandonText-Medium.eot'); src: url('/static/fonts/BrandonText-Medium.eot?#iefix') format('embedded-opentype'),url('/static/fonts/BrandonText-Medium.woff2') format('woff2'),url('/static/fonts/BrandonText-Medium.woff') format('woff'),url('/static/fonts/BrandonText-Medium.ttf') format('truetype'); font-weight: 500; font-style: normal; }
					@font-face { font-family: 'Brandon Text'; src: url('/static/fonts/BrandonText-Regular.eot'); src: url('/static/fonts/BrandonText-Regular.eot?#iefix') format('embedded-opentype'),url('/static/fonts/BrandonText-Regular.woff2') format('woff2'),url('/static/fonts/BrandonText-Regular.woff') format('woff'),url('/static/fonts/BrandonText-Regular.ttf') format('truetype'); font-weight: normal; font-style: normal; }
					@font-face { font-family: 'Brandon Text'; src: url('/static/fonts/BrandonText-Bold.eot'); src: url('/static/fonts/BrandonText-Bold.eot?#iefix') format('embedded-opentype'),url('/static/fonts/BrandonText-Bold.woff2') format('woff2'),url('/static/fonts/BrandonText-Bold.woff') format('woff'),url('/static/fonts/BrandonText-Bold.ttf') format('truetype'); font-weight: bold; font-style: normal; }

					:global(html),
					:global(body) {
						margin: 0;
						font-family: 'Brandon Text', sans-serif;
						font-size: 16px;
						line-height: 1.5;
					}
					:global(*){
						box-sizing: border-box;
					}
					:global(a) {
						color: inherit;
					}
					@media print {
						:global(body) {
							font-size: 10pt;
							print-color-adjust: exact;
							-webkit-print-color-adjust: exact;
						}
						:global(a[href]:after) {
							content: " (" attr(href) ")";
						}
						@page {
							margin: 1cm;
						}
					}
				`}</style>
				{/* <!-- Start Google Tag Manager --> */}
				<Head>
					<script dangerouslySetInnerHTML={{
						__html : `
							(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
							new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
							j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
							'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
							})(window,document,'script','dataLayer','${GTMID}');
						`
					}}/>
				</Head>
				<noscript>
					<iframe
						src={`https://www.googletagmanager.com/ns.html?id=${GTMID}`}
						height="0"
						width="0"
						style={{
							display    : 'none',
							visibility : 'hidden'
						}}/>
				</noscript>
				{/* <!-- End Google Tag Manager --> */}

				<Head>
					{meta['og:title'] &&
						<title>{meta['og:title']}</title>
					}
					{meta['og:url'] &&
						<link rel="canonical" href={meta['og:url']} />
					}
					{Object.keys(meta).map((m, i) => {
						if (meta[m]) {
							return (
								<meta key={i} property={m} content={meta[m]} />
							)
						}
						return null
					})}
					<meta name="viewport" content="width=device-width, initial-scale=1"/>
					<link rel="stylesheet" href="/static/lib/nprogress.css"/>

					<link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png"/>
					<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png"/>
					<link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png"/>
					<link rel="manifest" href="/static/favicon/manifest.json"/>
					<link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
					<link rel="shortcut icon" href="/static/favicon/favicon.ico"/>
					<meta name="msapplication-config" content="/static/favicon/browserconfig.xml"/>
					<meta name="theme-color" content="#ffffff"/>
				</Head>

				<Header {...this.props} ga={ga}/>
				<Child {...this.props} ga={ga}/>
				<Footer {...this.props} ga={ga}/>
			</div>
		)
	}
}
