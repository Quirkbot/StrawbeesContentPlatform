import AmountOfMaterial from 'src/components/amountOfMaterial'

export default ({
	items
}) =>
	<div
		className='root amountOfMaterialList'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
			}
			@media print {
				.root {
					justify-content: flex-start;
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
