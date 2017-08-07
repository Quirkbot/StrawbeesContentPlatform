import Link from 'src/components/link'
import generateClassnames from 'src/utils/generateClassnames'

export default ({
	title,
	description,
	featuredImage,
	url,
	color
}) =>
	<div
		className={`root lessonPlanCollectionListItem ${generateClassnames({
			title,
			description,
			featuredImage,
			url,
			color
		})}`}
		style={{
			color,
			backgroundColor : color
		}}>
		<style jsx>{`
			.root {
				width: 31rem;
			}
			.root :global(a){
				text-decoration: none;
				color: inherit;
			}
			.root.not-color {
				background-color: #DDD;
			}
			.root.not-color :global(.info) {
				color: #000;
			}
			.root.color :global(.info){
				color: #FFF;
			}
			.root :global(.info){
				padding: 1rem;
				display: flex;
				flex-direction: column;
				justify-content: center;
				min-height: 10rem;
			}
			.root :global(.featuredImage){
				display: block;
				width: 100%;
				height: auto;
			}
			.root :global(.info .title){
				text-transform: uppercase;
				margin: 0;
				font-size: 2rem;
				font-weight: 500;
				letter-spacing: 0.07rem;
			}
			@media (max-width: 600px) {
				.root :global(.info){
					min-height: 0;
				}
				.root :global(.info .title){
					font-size: 1.5rem;
				}
			}
		`}</style>
		<Link to={url}>
			{featuredImage &&
				<img className='featuredImage'
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
