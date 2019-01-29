export default (props, appProps) => ({
	initialInfo : {
		duration       : props && props.duration && props.duration.title,
		durationLabel  : appProps && appProps.strings && appProps.strings.duration,
		groupSize      : props && props.groupSize && props.groupSize.title,
		groupSizeLabel : appProps && appProps.strings && appProps.strings.groupSize,
		classSize      : props && props.classSize && props.classSize.title,
		classSizeLabel : appProps && appProps.strings && appProps.strings.classSize,
		overview       : props && props.overview,
		overviewLabel  : appProps && appProps.strings && appProps.strings.overview,
		gallery        : props && props.gallery
	}
})
