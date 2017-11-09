const TranslationStatusItem = ({
	label,
	data,
	hash
}) => {
	if (Array.isArray(data)) {
		return data.map((item, i) => <TranslationStatusItem key={i} hash={`${hash}${i}`} label={label} data={item}/>)
	}
	if (typeof data !== 'object' || data === null) {
		return null
	}
	return (
		<div className={`root translationStatusItem ${data.status}`}>
			<style jsx>{`
				.root {
					padding: 1rem;
					border: solid 1px;
					position: relative;
					display: grid;
					grid-template-columns: 1fr;
					grid-gap: 0.5rem;
				}
				.root.missing {
					border-color: red;
				}
				.root.translated {
					border-color: black;
				}
				.root.not-used {
					border-color: orange;
				}
				.tab-label {
					cursor: pointer;
				}
				.tab-checkbox {
					display: none;
				}
				.tab-checkbox:not(:checked) ~ .tab-content {
					display: none !important
				}
				.tab-checkbox:checked ~ .tab-content {
					display: inherit;
				}

				.edit {
					position: absolute;
					top: 0;
					right: 0;
				}
				.field {
					border-top: solid 1px rgba(0,0,0,0.2);
				}
				.field:first-of-type{
					border-top: none;
				}
				.field:not(.sub-field) .value{
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
					grid-gap: 0.5rem;
				}
				.field .name {
					font-weight: bold;
					margin-bottom: 0.2rem;
				}
				.field.missing .name {
					color: red;
				}
				.field.translated .name {
					color: black;
				}
				.field.not-used .name {
					color: orange;
				}
			`}</style>

			{typeof data.contentfulUrl !== 'undefined' &&
				<a href={data.contentfulUrl} className='edit'>Edit</a>
			}
			{Object.keys(data)
				.filter(key => key !== 'contentfulUrl')
				.filter(key => key !== 'status')
				.map(key => {
					const item = data[key]
					if (!item) {
						return null
					}
					const {
						status,
						englishValue,
						localValue
					} = item
					const uid = `${hash}${key}`
					if (typeof status !== 'undefined' && typeof englishValue !== 'undefined' && typeof localValue !== 'undefined') {
						return (
							<div className={`field ${status}`} key={key}>
								<label className='name tab-label' htmlFor={uid}>{key}</label>
								<input id={uid} type='checkbox' className='tab-checkbox' />
								<div className='value  tab-content'>
									<div className='local-value'>{localValue}</div>
									<div className='english-value'>{englishValue}</div>
								</div>
							</div>
						)
					}
					return (
						<div className='field sub-field' key={key}>
							<label className='name tab-label' htmlFor={uid}>{key}</label>
							<input id={uid} type='checkbox' className='tab-checkbox' />
							<div className='value  tab-content'>
								<TranslationStatusItem hash={`${hash}${key}`} label={key} data={item}/>
							</div>
						</div>
					)
				})}
		</div>
	)
}
export default TranslationStatusItem
