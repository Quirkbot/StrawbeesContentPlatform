export default ({
	title,
	entries
}) =>
	<div
		className='root entryTitleSelector'>
		{title &&
			<div className='title'>
				{title}
			</div>
		}
		{entries &&
			<div className='entries'>
				{entries.map((entry, i) =>
					<div
						className={`entry ${entry.selected ? 'selected' : ''}`}
						key={i}>
						{entry.title}
					</div>
				)}
			</div>
		}
	</div>
