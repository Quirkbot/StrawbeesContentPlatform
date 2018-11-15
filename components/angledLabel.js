export default ({
	children,
	color = 'white',
	textColor = 'black'
}) =>
	<div
		className='root angledLabel'>
		<style jsx>{`
			.root {
				width: 6rem;
				height: 6rem;
				overflow: hidden;
			}
			.root .label {
				text-align: center;
				width: 8rem;
				background-color: ${color};
				text-transform: uppercase;
				color: ${textColor};
				letter-spacing: 0.05rem;
				font-size: 0.6rem;
				transform-origin: top left;
				transform: translate(-1rem,4.7rem) rotate(-45deg);
				opacity: 0.7;
			}
		`}</style>
		<div className='label'>{children}</div>
	</div>
