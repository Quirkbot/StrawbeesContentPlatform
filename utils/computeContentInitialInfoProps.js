export default (props, appProps) => ({
	initialInfo : {
		duration       : props.duration.title,
		durationLabel  : appProps.strings.duration,
		groupSize      : props.groupSize.title,
		groupSizeLabel : appProps.strings.groupSize,
		classSize      : props.classSize.title,
		classSizeLabel : appProps.strings.classSize,
		overview       : props.overview,
		overviewLabel  : appProps.strings.overview,
		gallery        : props.gallery
	}
})
