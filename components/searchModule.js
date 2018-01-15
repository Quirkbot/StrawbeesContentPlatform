import React from 'react'
import Fuse from 'fuse.js'
import EntryTitleSelector from 'src/components/entryTitleSelector'
import LessonPlanList from 'src/components/lessonPlanList'
import SvgIcon from 'src/components/svgIcon'

export default class extends React.Component {
	static defaultProps = {
		appProps    : {},
		ageGroups   : [],
		tags        : [],
		lessonPlans : [],
		coMaterials : [],
	}

	constructor(props) {
		super(props)
		this.fuse = new Fuse(props.lessonPlans, {
			threshold : 0.5,
			keys      : [
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
		if (typeof window === 'undefined') {
			return
		}
		if (typeof window.history === 'undefined') {
			return
		}
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

		window.history.replaceState({}, '', search)
		// Remove the dangling '?'
		const { href } = window.location
		if (href.charAt(href.length - 1) === '?') {
			window.history.replaceState({}, '', href.slice(0, -1))
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

		const {
			ageGroups,
			coMaterials
		} = this.props

		let { lessonPlans } = this.props
		lessonPlans = [...lessonPlans]
		/*lessonPlans = lessonPlans.slice(0).sort((a, b) => {
			if (a.ageGroup.sys.id !== b.ageGroup.sys.id) {
				const aO = ageGroups.filter(o => o.sys.id === a.ageGroup.sys.id).pop()
				const bO = ageGroups.filter(o => o.sys.id === b.ageGroup.sys.id).pop()
				return ageGroups.indexOf(aO) > ageGroups.indexOf(bO) ? 1 : -1
			}
			if (a.coMaterial.sys.id !== b.coMaterial.sys.id) {
				const aO = coMaterials.filter(o => o.sys.id === a.coMaterial.sys.id).pop()
				const bO = coMaterials.filter(o => o.sys.id === b.coMaterial.sys.id).pop()
				return coMaterials.indexOf(aO) > coMaterials.indexOf(bO) ? 1 : -1
			}
			return a.number > b.number ? 1 : -1
		})*/

		state.foundLessonPlans = searchQuery ?
			this.fuse.search(searchQuery) : [...lessonPlans]


		state.foundLessonPlans = state.foundLessonPlans.filter(l => {
			if (!searchQuery && !selectedAgeGroups.length && !selectedCoMaterials.length && !selectedTags.length) {
				return true
			}

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
		this.filterFoundLessonPlans(newState)
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
			ageGroups,
			tags,
			coMaterials
		} = this.props

		let resultsTitle = ''
		if (foundLessonPlans.length === 0) {
			if (!searchQuery && !selectedAgeGroups.length && !selectedCoMaterials.length && !selectedTags.length) {
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
						{/*<div className='title'>{appProps.strings.searchFilters}</div>*/}
						{ageGroups &&
							<EntryTitleSelector
								title={appProps.strings.ageGroup}
								entries={ageGroups}
								selectedEntries={selectedAgeGroups}
								entrySelected={ageGroupSelected}
								entryDeselected={ageGroupDeselected}
							/>
						}
						{/*coMaterials &&
							<EntryTitleSelector
								title={appProps.strings.coMaterial}
								entries={coMaterials}
								selectedEntries={selectedCoMaterials}
								entrySelected={coMaterialSelected}
								entryDeselected={coMaterialDeselected}
							/>
						*/}
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
						<LessonPlanList items={foundLessonPlans} />
					}
				</div>
			</div>
		)
	}
}
