import Link from 'src/components/link'
import generateClassnames from 'src/utils/generateClassnames'

export default ({
	number,
	ageGroup,
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
				width: 23rem;
				position: relative;
			}
			.root :global(a){
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
			.root :global(.info){
				padding: 1rem;
				display: flex;
				flex-direction: column;
				justify-content: center;
				min-height: 8rem;
				color: #FFF;
			}
			.root :global(.featuredImage){
				display: block;
				width: 100%;
				height: auto;
			}
			.root :global(.info .title){
				margin: 0;
				font-size: 1.5rem;
				font-weight: bold;
			}
			.root :global(.number),
			.root :global(.label) {
				position: absolute;
				background-color: inherit;
			}

			.root :global(.number) {
				left: 1rem;
				font-size: 2.5rem;
				font-weight: bold;
				padding: 0 1rem;
				border-bottom-right-radius: 0.8rem;
				border-bottom-left-radius: 0.8rem;
			}
			.root :global(.label) {
				right: 1rem;
				font-size: 1.5rem;
				font-weight: bold;
				padding: 0 1rem;
				border-bottom-right-radius: 0.5rem;
				border-bottom-left-radius: 0.5rem;
				letter-spacing: 0.3rem;
			}

			@media screen and (max-width: 600px) {
				.root :global(.info){
					min-height: 0;
				}
				.root :global(.info .title){
					font-size: 1.3rem;
				}
			}
			@media screen and (max-width: 800px) {
				.root {
					width: 20rem;
					position: relative;
				}
			}
		`}</style>
		<Link to={url}>
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
			{featuredImage &&
				<img className='featuredImage'
					width='535'
					height='345'
					srcSet={`${featuredImage.url}?w=535&h=345&fit=fill, ${featuredImage.url}?w=1070&h=690&fit=fill 2x`}
					src={`${featuredImage.url}?w=535&h=345&fit=fill`}
				/>
			}
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
