export default ({
	title
}) =>
	<div
		className='root tagTitle'>
		<style jsx>{`
			.root {
				background-color: white;
				color: black;
				text-transform: uppercase;
				font-size: 0.8rem;
				border-radius: 1rem;
				padding: 0 0.5rem;
				margin: 0.1rem;
			}
		`}</style>
		{title}
	</div>
