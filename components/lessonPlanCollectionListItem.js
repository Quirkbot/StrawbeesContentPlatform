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
			.root :global(a){
				text-decoration: none;
				color: inherit;
			}
			.root.not-color {
				background-color: #DDD;
			}
			.root.not-color .info {
				color: #000;
			}
			.root.color .info{
				color: #FFF;
			}
		`}</style>
		<Link to={url}>
			{featuredImage &&
				<img className='featuredImage'
					srcSet={`${featuredImage.url}?w=535&h=345, ${featuredImage.url}?w=1070&h=690 2x`}
					src={`${featuredImage.url}?w=535&h=345`}
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
