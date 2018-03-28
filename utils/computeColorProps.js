export default (props) => {
	const ageGroupColor = props.ageGroups && props.ageGroups.length === 1 && props.ageGroups[0].cssColor
	return {
		color     : ageGroupColor || '#ababab',
		textColor : 'white'
	}
}
