export default (list = [], appProps = {}, propsComputers = []) => (list || []).map(props => ({
	...props,
	...propsComputers.reduce(
		(reducedProps, propsComputer) => ({
			...reducedProps,
			...propsComputer(props, appProps)
		}),
		{}
	)
}))
