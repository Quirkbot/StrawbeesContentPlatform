import Link from 'src/components/link'
import generateEntryPermalink from 'src/utils/generateEntryPermalink'

export default ({
	contentType = 'lessonPlanGroup',
	slug,
	meta,
	title,
	description,
	featuredImage
}) =>
	<div className='lessonPlanGroupListItem root'>
		<Link to={generateEntryPermalink({ meta, contentType, slug })}>
			<img className='featuredImage'
				src={`${featuredImage.url}?w=535&h=345`}
			/>
			<h4 className='title'>
				{title}
			</h4>
			<p className='description'>
				{description}
			</p>
		</Link>
	</div>
