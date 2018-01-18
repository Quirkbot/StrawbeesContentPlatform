import Button from 'src/components/button'

export default ({
	title,
	small,
	entries,
	selectedEntries,
	entrySelected,
	entryDeselected
}) =>
	<div
		className='root entryTitleSelector'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin: 0.25rem;
			}
			.root .title {
				font-size: 1rem;
				font-weight: 500;
				margin-right: 0.5rem;
			}
			.root .entries {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
			}
			.root .entries :global(.button) {
				margin: 0.25rem;
			}
			@media screen and (max-width:600px) {
				.root {
					flex-direction: column;
				}
			}
		`}</style>
		{title &&
			<div className='title'>
				{title}:
			</div>
		}
		{entries &&
			<div className='entries'>
				{entries.map((entry, i) =>
					<Button
						key={i}
						onClick={() => {
							if (selectedEntries.indexOf(entry) !== -1) {
								entryDeselected(entry)
							} else {
								entrySelected(entry)
							}
						}}
						title={entry.title}
						cssTextColor={entry.cssColor && 'white'}
						cssColor={entry.cssColor || 'white'}
						icon={selectedEntries.indexOf(entry) !== -1 ? 'close' : null}
						border={selectedEntries.indexOf(entry) !== -1}
						small={small}
					/>
				)}
			</div>
		}
	</div>
