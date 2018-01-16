import Link from 'src/components/link'
import AgeGroupTitleList from 'src/components/ageGroupTitleList'
import TagTitleList from 'src/components/tagTitleList'
import generateClassnames from 'src/utils/generateClassnames'

const THUMB_WIDTH = 535
const THUMB_HEIGHT = 345
export default ({
	ageGroups,
	tags,
	title,
	description,
	featuredImage,
	url
}) => {
	// Only set a main color, if there's only one age group
	let cssColor = '#DDD'
	if (ageGroups.length === 1 && ageGroups[0].cssColor) {
		cssColor = ageGroups[0].cssColor
	}
	return (
		<div
			className={`root lessonPlanThumbnail ${generateClassnames({
				title,
				ageGroups,
				description,
				featuredImage,
				url
			})}`}>
			<style jsx>{`
				.root {
					position: relative;
					cursor: pointer;
					border-radius: 0.5rem;
					transition: transform 0.1s;
					color: ${cssColor};
					background-color: ${cssColor};
				}
				.root:hover {
					transform: scale(1.025);
				}
				.root :global(.link){
					text-decoration: none;
					color: inherit;
				}
				.root .details {
					position: relative;
					width: 100%;
					padding-bottom: ${(THUMB_HEIGHT / THUMB_WIDTH) * 100}%
				}
				.root .details .wrapper {
					position: absolute;
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
				}
				.root .details :global(.ageGroupTitleList) {
					position: absolute;
					top: 0;
					width: 100%;
					padding: 0.5rem;
					justify-content: flex-end;
				}
				.root .details :global(.tagTitleList) {
					padding: 0.5rem;
					justify-content: flex-end;
					z-index: 1;
				}
				.root .details .featuredImage {
					display: block;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: auto;
					border-top-left-radius: 0.5rem;
					border-top-right-radius: 0.5rem;
				}
				.root .info {
					padding: 1rem;
					display: flex;
					flex-direction: column;
					justify-content: center;
					min-height: 8rem;
					color: #FFF;
				}
				.root .info .title{
					margin: 0;
					font-size: 1.25rem;
					font-weight: bold;
				}

			`}</style>
			<Link to={url}>
				<div className='details'>
					<div className='wrapper'>
						{featuredImage &&
							<img className='featuredImage'
								width={THUMB_WIDTH}
								height={THUMB_HEIGHT}
								srcSet={`${featuredImage.url}?w=${THUMB_WIDTH}&h=${THUMB_HEIGHT}&fit=fill, ${featuredImage.url}?w=${THUMB_WIDTH * 2}&h=${THUMB_HEIGHT * 2}&fit=fill 2x`}
								src={`${featuredImage.url}?w=${THUMB_WIDTH}&h=${THUMB_HEIGHT}&fit=fill`}
							/>
						}
						{ageGroups &&
							<AgeGroupTitleList items={ageGroups} />
						}
						{tags &&
							<TagTitleList items={tags} />
						}
					</div>
				</div>
				<div className='info'>
					{title &&
						<h4 className='title'>
							{title}
						</h4>
					}
					{description &&
						<p className='description'>
							{description}
						</p>
					}
				</div>
			</Link>
		</div>
	)
}
