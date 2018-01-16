export default ({
	title,
	cssColor
}) =>
	<div
		className='root ageGroupTitle'>
		<style jsx>{`
			.root {
				background-color: ${cssColor};
				color: white;
				text-transform: uppercase;
				font-size: 0.8rem;
				border-radius: 1rem;
				padding: 0.4rem 0.8rem;
				margin: 0.1rem;
			}
		`}</style>
		{title}
	</div>
