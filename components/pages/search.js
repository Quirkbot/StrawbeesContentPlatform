import React from 'react'
import Fuse from 'fuse.js'
import Breadcrumbs from 'src/components/breadcrumbs'
import Hero from 'src/components/hero'
import EntryTitleSelector from 'src/components/entryTitleSelector'
import LessonPlanList from 'src/components/lessonPlanList'
import generateUrl from 'src/utils/generateUrl'

export default class Page extends React.Component {
	static async getInitialProps({ query }, fetchLocalData, appProps) {
		const { locale } = query
		const data = await fetchLocalData(locale, `{
			lessonPlans {
				sys {
					id
					contentTypeId
				}
				title
				slug
				number
				description
				featuredImage { url }
				ageGroup {
					sys { id }
					title
					cssColor
				}
				coMaterial {
					sys { id }
					title
				}
				tags {
					sys { id }
					title
				}
			}

			ageGroups {
				sys { id }
				title
			}

			coMaterials {
				sys { id }
				title
			}

			tags {
				sys { id }
				title
			}
		}`)
		return {
			...data,
			lessonPlans : (data.lessonPlans || []).map(item => ({
				...item,
				url : generateUrl({
					appProps,
					contentType : item.sys.contentTypeId,
					slug        : item.slug
				}),
				number : null
			}))
		}
	}

	static defaultProps = {
		appProps     : {},
		breadcrumbs  : [],
		hero         : {},
		featuredIcon : [],
		ageGroups    : [],
		tags         : [],
		lessonPlans  : [],
		coMaterials  : [],
	}

	constructor(props) {
		super(props)
		this.fuse = new Fuse(props.lessonPlans, {
			keys : [
				'title',
				'description',
				'ageGroup.title',
				'coMaterial.title',
				'tags.title'
			],
		})
		this.state = {
			selectedAgeGroups   : [],
			selectedCoMaterials : [],
			selectedTags        : [],
			searchQuery         : '',
			foundLessonPlans    : []
		}
	}

	componentDidMount = () => {
		this.filterFoundLessonPlans(
			this.locationToState()
		)
	}

	stateToLocation = state => {
		if (typeof history !== 'undefined') {
			const {
				selectedAgeGroups,
				selectedCoMaterials,
				selectedTags,
				searchQuery
			} = state
			let search = ''
			const arrayToQuery = (key, array) => {
				if (array.length) {
					if (search) {
						search += '&'
					}
					search += `${key}=${array.map(i => encodeURIComponent(i.title.toLowerCase())).join(',')}`
				}
			}
			if (searchQuery) {
				search += `q=${encodeURIComponent(searchQuery)}`
			}
			arrayToQuery('age', selectedAgeGroups)
			arrayToQuery('material', selectedCoMaterials)
			arrayToQuery('tags', selectedTags)

			search = `?${search}`

			history.replaceState({}, '', search)
		}
	}
	locationToState = () => {
		const {
			ageGroups,
			tags,
			coMaterials
		} = this.props

		const state = {
			selectedAgeGroups   : [],
			selectedCoMaterials : [],
			selectedTags        : [],
			searchQuery         : '',
			foundLessonPlans    : []
		}
		if (typeof window === 'undefined' || typeof window.location === 'undefined') {
			return state
		}
		const params = new URLSearchParams(window.location.search)
		const parseArrayParams = (key, stack) => {
			if (!params.has(key)) {
				return []
			}
			return params.get(key).split(',')
			.map(l => stack.filter(s => s.title.toLowerCase() === l).pop())
			.filter(l => l)
		}
		state.searchQuery = params.get('q') || ''
		state.selectedAgeGroups = parseArrayParams('age', ageGroups)
		state.selectedCoMaterials = parseArrayParams('material', coMaterials)
		state.selectedTags = parseArrayParams('tag', tags)
		return state
	}

	addToStateProperty = (entry, name) => {
		const newState = { ...this.state }
		newState[name].push(entry)
		this.filterFoundLessonPlans(newState, true)
	}
	removeFromStateProperty = (entry, name) => {
		const newState = { ...this.state }
		const index = this.state[name].indexOf(entry)
		if (index === -1) {
			return
		}
		newState[name].splice(index, 1)
		this.filterFoundLessonPlans(newState, true)
	}

	filterFoundLessonPlans = (state) => {
		const { lessonPlans } = this.props
		const {
			selectedAgeGroups,
			selectedCoMaterials,
			selectedTags,
			searchQuery
		} = state

		this.stateToLocation({
			selectedAgeGroups,
			selectedCoMaterials,
			selectedTags,
			searchQuery
		})

		state.foundLessonPlans = searchQuery ?
			this.fuse.search(searchQuery) : [...lessonPlans]

		state.foundLessonPlans = state.foundLessonPlans.filter(l => {
			const foundByAgeGroup = selectedAgeGroups.length > 0 ?
				selectedAgeGroups.filter(o => o.sys.id === l.ageGroup.sys.id).length : true
			const foundByCoMaterial = selectedCoMaterials.length > 0 ?
				selectedCoMaterials.filter(o => o.sys.id === l.coMaterial.sys.id).length : true
			const foundByTag = selectedTags.length > 0 ?
				selectedTags.filter(o => l.tags.filter(t => t.sys.id === o.sys.id).length).length : true

			return foundByAgeGroup && foundByCoMaterial && foundByTag
		})

		this.setState(state)
	}

	ageGroupSelected = entry =>
		this.addToStateProperty(entry, 'selectedAgeGroups')

	ageGroupDeselected = entry =>
		this.removeFromStateProperty(entry, 'selectedAgeGroups')

	coMaterialSelected = entry =>
		this.addToStateProperty(entry, 'selectedCoMaterials')

	coMaterialDeselected = entry =>
		this.removeFromStateProperty(entry, 'selectedCoMaterials')

	tagSelected = entry =>
		this.addToStateProperty(entry, 'selectedTags')

	tagDeselected = entry =>
		this.removeFromStateProperty(entry, 'selectedTags')

	searchQueryChanged = event => {
		const newState = { ...this.state }
		newState.searchQuery = event.target.value
		this.filterFoundLessonPlans(newState, true)
	}

	render() {
		const {
			ageGroupSelected,
			ageGroupDeselected,
			coMaterialSelected,
			coMaterialDeselected,
			searchQueryChanged,
			tagSelected,
			tagDeselected
		} = this

		const {
			selectedAgeGroups,
			selectedCoMaterials,
			selectedTags,
			searchQuery,
			foundLessonPlans
		} = this.state

		const {
			appProps,
			breadcrumbs,
			hero,
			featuredIcon,
			ageGroups,
			tags,
			lessonPlans,
			coMaterials
		} = this.props
		delete hero.icon
		return (
			<div className='root searchPage'>
				{breadcrumbs &&
					<Breadcrumbs {...breadcrumbs}/>
				}
				{hero &&
					<Hero {...hero}>
						<input
							type="text"
							value={searchQuery}
							onChange={searchQueryChanged}
						/>
						{featuredIcon &&
							<img className='icon' src={featuredIcon.url} />
						}
						<div className='selectors'>
							{ageGroups &&
								<EntryTitleSelector
									title={appProps.strings.ageGroup}
									entries={ageGroups}
									selectedEntries={selectedAgeGroups}
									entrySelected={ageGroupSelected}
									entryDeselected={ageGroupDeselected}
								/>
							}
							{coMaterials &&
								<EntryTitleSelector
									title={appProps.strings.coMaterial}
									entries={coMaterials}
									selectedEntries={selectedCoMaterials}
									entrySelected={coMaterialSelected}
									entryDeselected={coMaterialDeselected}
								/>
							}
							{tags &&
								<EntryTitleSelector
									title={appProps.strings.tag}
									entries={tags}
									selectedEntries={selectedTags}
									entrySelected={tagSelected}
									entryDeselected={tagDeselected}
								/>
							}
						</div>
					</Hero>
				}

				<h1 className='results title'>
					{foundLessonPlans.length === 0 && appProps.strings.noLessonsFound}
					{foundLessonPlans.length > 0 && appProps.strings.foundLessons}
				</h1>
				{foundLessonPlans.length > 0 &&
					<LessonPlanList items={foundLessonPlans} />
				}
			</div>
		)
	}
}
