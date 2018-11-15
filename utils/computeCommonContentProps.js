import computeColorProps from 'src/utils/computeColorProps'
import computeContentTypeProps from 'src/utils/computeContentTypeProps'
import computeUrlProps from 'src/utils/computeUrlProps'
import computeAuthorProps from 'src/utils/computeAuthorProps'
import computeTaxonomyProps from 'src/utils/computeTaxonomyProps'

export default (props, appProps) => ({
	title         : props.title,
	description   : props.description,
	featuredImage : props.featuredImage,
	...computeTaxonomyProps(props, appProps),
	...computeColorProps(props, appProps),
	...computeContentTypeProps(props, appProps),
	...computeUrlProps(props, appProps),
	...computeAuthorProps(props, appProps)
})
