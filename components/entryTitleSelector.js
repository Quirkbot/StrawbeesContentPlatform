export default ({
	title,
	entries,
	selectedEntries,
	entrySelected,
	entryDeselected
}) => {
	return (
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
							className={`entry ${selectedEntries.indexOf(entry) !== -1 ? 'selected' : ''}`}
							key={i}
							onClick={() => {
								if (selectedEntries.indexOf(entry) !== -1) {
									entryDeselected(entry)
								} else {
									entrySelected(entry)
								}
							}}
							>
							{selectedEntries.indexOf(entry) !== -1 ? '(x)' : ''}{entry.title}
						</div>
					)}
				</div>
			}
		</div>
	)
}
