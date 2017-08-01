/*export default class Search extends React.Component {
	static async getInitialProps(ctx) {

	}

	render() {
		return (
		)
	}
}*/


import Breadcrumbs from 'src/components/breadcrumbs'
import Hero from 'src/components/hero'
import EntryTitleSelector from 'src/components/entryTitleSelector'

const Page = ({
	appProps,
	breadcrumbs,
	hero,
	featuredIcon,
	lessonPlans,
	ageGroups,
	tags,
	coMaterials
}) => {
	delete hero.icon
	return (
		<div className='root searchPage'>
			{breadcrumbs &&
				<Breadcrumbs {...breadcrumbs}/>
			}
			{hero &&
				<Hero {...hero}>
					{featuredIcon &&
						<img className='icon' src={featuredIcon.url} />
					}
					<div className='selectors'>
						{ageGroups &&
							<EntryTitleSelector
								title={appProps.strings.ageGroup}
								entries={ageGroups}
							/>
						}
						{coMaterials &&
							<EntryTitleSelector
								title={appProps.strings.coMaterial}
								entries={coMaterials}
							/>
						}
						{tags &&
							<EntryTitleSelector
								title={appProps.strings.tag}
								entries={tags}
							/>
						}
					</div>
				</Hero>
			}
		</div>
	)
}

Page.getInitialProps = async ({ query }, fetchLocalData) => {
	const { locale } = query
	const data = await fetchLocalData(locale, `{
		lessonPlans {
			title
			slug
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
		foundLessons : []
	}
}
export default Page
