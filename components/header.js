import Link from 'components/link'

import {
	selectSiteLinks
} from 'utils/selectors'

export default props => {
	const siteLinks = selectSiteLinks(props)
	// const lessonPlanCollectionUrl = selectContentTypeIndexUrl(url, 'lessonPlanCollection')
	return (
		<div>
			<nav>
				<ul>
					{siteLinks.map((siteLink, i) =>
						<li
							key={i}
							className={siteLink.active ? 'active' : ''}>
							<Link to={siteLink.url}>
								{JSON.stringify(siteLink, null, 2)}
							</Link>
						</li>
					)}
					{/*<li>
						<Link>
							<a href={lessonPlanCollectionUrl}>
								Lesson Plans
							</a>
						</Link>
					</li>*/}
				</ul>
			</nav>
		</div>
	)
}
