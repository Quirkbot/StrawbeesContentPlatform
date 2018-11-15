import React from 'react'
import Markdown from 'react-remarkable'

import ContentThumbnailList from 'src/components/contentThumbnailList'
import computeCommonContentProps from 'src/utils/computeCommonContentProps'

const Component = ({
	body = '',
	relatedContent = []
}) =>
	<div
		className='root defaultPage'>
		<style jsx>{`
			.root  {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.root .body {
				position: relative;
				max-width: 70rem;
				padding: 1rem;
			}
			.root .body :global(img){
				max-width: 100%;
			}
			.root .body :global(h1){
				font-size: 3rem;
			}
			.root .body :global(h2){
				font-size: 2rem;
			}
			.root .body :global(h1),
			.root .body :global(h2),
			.root .body :global(h3),
			.root .body :global(h4){
				text-transform: uppercase;
			}
		`}</style>
		{body &&
			<div className='body'>
				<Markdown source={body}/>
			</div>
		}
		{relatedContent &&
			<ContentThumbnailList items={relatedContent}/>
		}
	</div>

Component.getInitialProps = async ({ query }, fetchLocalData, appProps) => {
	const { locale, contentType, id } = query
	const basicQuery = `
		sys { contentTypeId }
		title
		slug
		description
		featuredImage { url }
	`
	const infoQuery = `
		ageGroups {
			title
			cssColor
		}
		tags {
			title
		}
	`
	const { props } = await fetchLocalData(locale, `{
		props:${contentType} (id:"${id}"){
			body
			relatedContent {
				... on LessonPlan {
					${basicQuery}
					${infoQuery}
				}
				... on Activity {
					${basicQuery}
					${infoQuery}
				}
				... on Page {
					${basicQuery}
				}
			}
		}
	}`)
	return {
		...props,
		relatedContent : (props.relatedContent || []).map(itemProps => ({
			...itemProps,
			...computeCommonContentProps(itemProps, appProps)
		}))
	}
}

export default Component
