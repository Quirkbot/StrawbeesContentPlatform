import computeCommonContentProps from 'src/utils/computeCommonContentProps'

export default (props, appProps) => ({
	hero : {
		...computeCommonContentProps(props, appProps)
	}
})
