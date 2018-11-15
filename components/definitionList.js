import Definition from 'src/components/definition'

export default ({
	items
}) =>
	<div
		className='root definitionList'>
		<style jsx>{`
			.root {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				grid-column-gap: 1rem;
				grid-row-gap: 1rem;
				justify-items: center;
				padding-top: 1rem;
				padding-bottom: 1rem;
				width: 60rem;
				max-width: 100%;
			}
			.root :global(>*){
				width: 100%;
				max-width: 11rem;
			}
			@media screen and (max-width: 850px) {
				.root {
					grid-template-columns: repeat(3, 1fr);
				}
			}
			@media screen and (max-width: 600px) {
				.root {
					grid-template-columns: repeat(2, 1fr);
				}
			}
			@media screen and (max-width: 450px) {
				.root {
					grid-template-columns: repeat(1, 1fr);
				}
			}
		`}</style>
		{items.map((props, i) =>
			<Definition
				key={i}
				{...props}
			/>
		)}
	</div>
