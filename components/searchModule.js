import React from 'react'
import Fuse from 'fuse.js'
// import Router from 'next/router'
import EntryTitleSelector from 'src/components/entryTitleSelector'
import LessonPlanThumbnailList from 'src/components/lessonPlanThumbnailList'
import SvgIcon from 'src/components/svgIcon'

export default class extends React.Component {
	static defaultProps = {
		appProps    : {},
		ageGroups   : [],
		tags        : [],
		lessonPlans : []
	}

	constructor(props) {
		super(props)
		this.fuse = new Fuse(props.lessonPlans, {
			threshold : 0.5,
			keys      : [
				'title',
				'description',
				'ageGroup.title',
				'tags.title'
			],
		})
		this.state = {
			selectedAgeGroups : [],
			selectedTags      : [],
			searchQuery       : '',
			foundLessonPlans  : [...props.lessonPlans]
		}
	}

	// componentDidMount = () => {
	// 	Router.router.events.on('routeChangeComplete', this.onRouteChangeComplete)
	// 	this.filterFoundLessonPlans(
	// 		this.locationToState()
	// 	)
	// }


	stateToLocation = state => {
		if (typeof window === 'undefined') {
			return
		}
		if (typeof window.history === 'undefined') {
			return
		}
		const {
			selectedAgeGroups,
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
		arrayToQuery('tags', selectedTags)

		// Router.push(
		// 	{
		// 		pathname : Router.router.pathname,
		// 		query    : Router.router.query
		// 	},
		// 	`${Router.router.route}${search ? `?${search}` : ''}`,
		// 	{ shallow : true }
		// )
	}
	locationToState = () => {
		const {
			ageGroups,
			tags
		} = this.props

		const state = {
			selectedAgeGroups : [],
			selectedTags      : [],
			searchQuery       : '',
			foundLessonPlans  : []
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
		state.selectedTags = parseArrayParams('tag', tags)
		return state
	}

	addToStateProperty = (entry, name) => {
		const newState = { ...this.state }
		newState[name].push(entry)
		this.filterFoundLessonPlans(newState)
	}
	removeFromStateProperty = (entry, name) => {
		const newState = { ...this.state }
		const index = this.state[name].indexOf(entry)
		if (index === -1) {
			return
		}
		newState[name].splice(index, 1)
		this.filterFoundLessonPlans(newState)
	}

	filterFoundLessonPlans = state => {
		const {
			selectedAgeGroups,
			selectedTags,
			searchQuery
		} = state

		const { lessonPlans } = this.props

		const foundBy = (key, lessonPlan, selection) => {
			if (selection.length > 0) {
				if (!selection.filter(
					o => lessonPlan[key].filter(
						t => t.sys.id === o.sys.id
					).length
				).length) {
					return false
				}
			}
			return true
		}

		// Find by text search query (or all results if query is empty)
		state.foundLessonPlans = searchQuery ?
			this.fuse.search(searchQuery) : [...lessonPlans]

		// Filter by taxonomies
		state.foundLessonPlans = state.foundLessonPlans.filter(l => {
			if (!foundBy('ageGroups', l, selectedAgeGroups)) {
				return false
			}
			if (!foundBy('tags', l, selectedTags)) {
				return false
			}
			return true
		})

		this.setState(state)
	}

	ageGroupSelected = entry =>
		this.addToStateProperty(entry, 'selectedAgeGroups')

	ageGroupDeselected = entry =>
		this.removeFromStateProperty(entry, 'selectedAgeGroups')

	tagSelected = entry =>
		this.addToStateProperty(entry, 'selectedTags')

	tagDeselected = entry =>
		this.removeFromStateProperty(entry, 'selectedTags')

	searchQueryChanged = event => {
		const newState = { ...this.state }
		newState.searchQuery = event.target.value
		this.filterFoundLessonPlans(newState)
	}

	render() {
		const {
			ageGroupSelected,
			ageGroupDeselected,
			searchQueryChanged,
			tagSelected,
			tagDeselected
		} = this

		const {
			selectedAgeGroups,
			selectedTags,
			searchQuery,
			foundLessonPlans
		} = this.state

		const {
			appProps,
			ageGroups,
			tags,
		} = this.props

		let resultsTitle = ''
		if (foundLessonPlans.length === 0) {
			if (!searchQuery && !selectedAgeGroups.length && !selectedTags.length) {
				resultsTitle = appProps.strings.emptySearch
			} else {
				resultsTitle = appProps.strings.noLessonsFound
			}
		}
		return (
			<div className='root searchModule'>
				<style jsx>{`

					.root .search {
						padding: 1rem;
						width: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						position: relative;
						justify-content: center;
						background-color: #eee;
					}
					.root .search .bar {
						width: 20rem;
						max-width: 100%;
						height: 3rem;
						border-radius: 5rem;
						border: solid 1px;
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-bottom: 1rem;
						background-color: white
					}
					.root .search .bar .input {
						flex: 1;
						margin-left: 1rem;
						border: 0;
						height: 90%;
						text-align: center;
						font-family: 'Brandon Text', sans-serif;
						font-size: 1.2rem;
						background-color: transparent;
					}
					.root .search .bar :global(svg) {
						height: 2.5rem;
						margin-right: 0.5rem;
						width: auto;
					}
					.root .search .selectors {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}
					.root .search .selectors .title {
						font-weight: 500;
						font-size: 1.2rem;
						margin-bottom: 0.5rem;
					}
					.root .results {
						width: 100%;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}
				`}</style>
				<div className='search'>
					<div className='bar'>
						<input
							type='text'
							className='input'
							value={searchQuery}
							placeholder={appProps.strings.searchFieldPlaceholder}
							onChange={searchQueryChanged}
						/>
						<SvgIcon icon='search'/>
					</div>
					<div className='selectors'>
						{/* <div className='title'>{appProps.strings.searchFilters}</div> */}
						{ageGroups &&
							<EntryTitleSelector
								title={appProps.strings.ageGroup}
								entries={ageGroups}
								selectedEntries={selectedAgeGroups}
								entrySelected={ageGroupSelected}
								entryDeselected={ageGroupDeselected}
							/>
						}
						{tags &&
							<EntryTitleSelector
								entries={tags}
								selectedEntries={selectedTags}
								entrySelected={tagSelected}
								entryDeselected={tagDeselected}
							/>
						}
					</div>
				</div>
				<div className='results'>
					{resultsTitle &&
						<h1 className='title'>
							{resultsTitle}
						</h1>
					}
					{foundLessonPlans.length > 0 &&
						<LessonPlanThumbnailList items={foundLessonPlans} />
					}
				</div>
			</div>
		)
	}
}
