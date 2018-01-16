import TagTitle from 'src/components/tagTitle'

export default ({
	items
}) =>
	<div
		className='root tagTitleList'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
			}
		`}</style>
		{items && items.map((item, i) =>
			<TagTitle key={i} {...item}/>
		)}
	</div>
