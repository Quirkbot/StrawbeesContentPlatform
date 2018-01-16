import Link from 'src/components/link'
import generateClassnames from 'src/utils/generateClassnames'

const THUMB_WIDTH = 535
const THUMB_HEIGHT = 345
export default ({
	ageGroup,
	tags,
	title,
	description,
	featuredImage,
	url
}) =>
	<div
		className={`root lessonPlanListItem ${generateClassnames({
			ageGroup,
			title,
			description,
			featuredImage,
			url
		})}`}
		style={ageGroup && ageGroup.cssColor && {
			color           : ageGroup.cssColor,
			backgroundColor : ageGroup.cssColor
		}}>
		<style jsx>{`
			.root {
				position: relative;
				cursor: pointer;
				border-radius: 0.5rem;
				transition: transform 0.1s;
			}
			.root:hover {
				transform: scale(1.025);
			}
			.root :global(.link){
				text-decoration: none;
				color: inherit;
			}
			.root.not-ageGroup {
				background-color: #DDD;
			}
			.root.not-ageGroup .label {
				color: #000;
			}
			.root.ageGroup .label{
				color: #FFF;
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
			}
			.root .details .label {
				position: absolute;
				background-color: inherit;
			}

			.root .details .label {
				right: 1rem;
				font-size: 1.2rem;
				font-weight: bold;
				padding: 0 1rem;
				border-bottom-right-radius: 0.5rem;
				border-bottom-left-radius: 0.5rem;
				letter-spacing: 0.3rem;
			}
			.root .details .tags {
				position: absolute;
				bottom: 0;
				width: 100%;
				padding: 0.5rem;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-end;
			}
			.root .details .tags .tag {
				background-color: rgba(255,255,255,0.9);
				color: black;
				text-transform: uppercase;
				font-size: 0.8rem;
				border-radius: 1rem;
				padding: 0 0.5rem;
				margin: 0.1rem;
			}
			.root .details .featuredImage {
				display: block;
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
					{ageGroup && ageGroup.title &&
						<div className='label'
							style={ageGroup && ageGroup.cssColor && {
								backgroundColor : ageGroup.cssColor
							}}>
							{ageGroup.title}
						</div>
					}
					{tags &&
						<div className='tags'>
							{tags.map((tag, i) =>
								<div key={i} className='tag'>
									{tag.title}
								</div>
							)}
						</div>
					}
					{featuredImage &&
						<img className='featuredImage'
							width={THUMB_WIDTH}
							height={THUMB_HEIGHT}
							srcSet={`${featuredImage.url}?w=${THUMB_WIDTH}&h=${THUMB_HEIGHT}&fit=fill, ${featuredImage.url}?w=${THUMB_WIDTH * 2}&h=${THUMB_HEIGHT * 2}&fit=fill 2x`}
							src={`${featuredImage.url}?w=${THUMB_WIDTH}&h=${THUMB_HEIGHT}&fit=fill`}
						/>
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
