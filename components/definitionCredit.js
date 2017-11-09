export default ({
	index,
	credit
}) =>
	<div
		className='root definitionCredit'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				font-size: 0.6rem;
				opacity: 0.8;
				margin-bottom: 0.5rem;
			}
			.root .index {
				margin-right: 0.5rem;
			}
			.root .index::before {
				content: '('
			}
			.root .index::after {
				content: ')'
			}
			.root .credit {
				text-align: left;
			}
			@media print {
				.root {
					page-break-inside: avoid;
				}
			}
		`}</style>
		{index &&
			<div className='index'>
				{index}
			</div>
		}
		{credit &&
			<div className='credit'>
				{credit}
			</div>
		}
	</div>
