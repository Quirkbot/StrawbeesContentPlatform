import AmountOfMaterial from 'src/components/amountOfMaterial'

export default ({
	items
}) =>
	<div
		className='root amountOfMaterialList'>
		<style jsx>{`
			.root {
				display: grid;
				grid-template-columns: repeat(5, 1fr);
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
					grid-template-columns: repeat(4, 1fr);
				}
			}
			@media screen and (max-width: 650px) {
				.root {
					grid-template-columns: repeat(3, 1fr);
				}
			}
			@media screen and (max-width: 500px) {
				.root {
					grid-template-columns: repeat(2, 1fr);
				}
			}
			@media screen and (max-width: 400px) {
				.root {
					grid-template-columns: repeat(1, 1fr);
				}
			}
		`}</style>
		{items.map((props, i) =>
			<AmountOfMaterial
				key={i}
				{...props}
			/>
		)}
	</div>
