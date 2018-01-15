import Link from 'src/components/link'
import generateClassnames from 'src/utils/generateClassnames'

export default ({
	number,
	ageGroup,
	tags,
	title,
	description,
	featuredImage,
	url
}) =>
	<div
		className={`root lessonPlanListItem ${generateClassnames({
			number,
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
			.root.not-ageGroup .number,
			.root.not-ageGroup .label {
				color: #000;
			}
			.root.ageGroup .number,
			.root.ageGroup .label{
				color: #FFF;
			}
			.root .details {
				position: relative;
			}
			.root .details .number,
			.root .details .label {
				position: absolute;
				background-color: inherit;
			}

			.root .details .number {
				left: 1rem;
				font-size: 2rem;
				font-weight: bold;
				padding: 0 1rem;
				border-bottom-right-radius: 0.8rem;
				border-bottom-left-radius: 0.8rem;
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
				{number &&
					<div className='number'
						style={ageGroup && ageGroup.cssColor && {
							backgroundColor : ageGroup.cssColor
						}}>
						{number}
					</div>
				}
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
						width='535'
						height='345'
						srcSet={`${featuredImage.url}?w=535&h=345&fit=fill, ${featuredImage.url}?w=1070&h=690&fit=fill 2x`}
						src={`${featuredImage.url}?w=535&h=345&fit=fill`}
					/>
				}
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
