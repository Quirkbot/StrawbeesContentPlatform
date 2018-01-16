import AgeGroupTitle from 'src/components/ageGroupTitle'

export default ({
	items
}) =>
	<div
		className='root ageGroupTitleList'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
			}
		`}</style>
		{items && items.map((item, i) =>
			<AgeGroupTitle key={i} {...item}/>
		)}
	</div>
