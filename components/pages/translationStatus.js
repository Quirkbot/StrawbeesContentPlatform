import TranslationStatusItem from 'src/components/translationStatusItem'

export default ({
	lessonPlans,
	structure,
	englishData,
	localData
}) => {
	return (
		<div className='root translationStatus'>
			<style jsx>{`
				.root {
					padding: 0.5rem;
					font-size: 0.8rem;
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
				/* .status */
				.status {
					display: grid;
					grid-template-rows: 1fr;
					grid-gap: 0.5rem;
				}
				.status .type  {
					border: solid 1px;
					border-radius: 1rem;
					padding: 0.5rem;
				}
				.status .type .type-name {
					margin: 0;
				}
				.status .type.missing .type-name {
					color: red;
				}
				.status .type.translated .type-name {
					color: black;
				}
				.status .type.not-used .type-name {
					color: orange;
				}
				.status .type .entries {
					display: grid;
					grid-template-columns: minmax(200px, 1fr);
					grid-gap: 0.5rem;
				}
				.status .type .entries .entry  {
					border: solid 1px;
					border-radius: 1rem;
					padding: 0.5rem;
					display: grid;
					grid-template-columns: 1fr;
					grid-gap: 0.5rem;
					text-decoration: none;
				}.status .type .entries .entry:hover  {
					background-color: rgba(0,0,0,0.05);
				}
				.status .type .entries .entry .field {
					display: grid;
					grid-template-columns: 100px 1fr 1fr;
					grid-gap: 0.5rem;
					border-top: solid 1px rgba(0,0,0,0.2);
				}
				.status .type .entries .entry .field:first-child {
					border-top: none;
				}
				.status .type .entries .entry .field .name {
					font-weight: bold;
				}
				.status .type .entries .entry .field.missing .name {
					color: red;
				}
				.status .type .entries .entry .field.translated .name {
					color: black;
				}
				.status .type .entries .entry .field.not-used .name {
					color: orange;
				}
				.status .type .entries .entry .field .english-value {
					opacity: 0.3;
				}
				/* .structure */
				.structure {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
					grid-gap: 0.5rem;
				}
				.structure .type {
					border: solid 1px;
					border-radius: 1rem;
					padding: 0.5rem;
				}
			`}</style>
			{/*	
				<h1>Lesson Plans</h1>
				{lessonPlans.map((lessonPlan, i) =>
				<TranslationStatusItem key={i} hash={i} data={lessonPlan} />)}
			*/}

			<h1>Entries Breakdown</h1>
			{structure && englishData && localData &&
				<div className='status'>
					{structure.map(({
						name   : typeName,
						id     : typeId,
						fields : typeFields,
						status : typeStatus
					}) => {
						const englishEntries = englishData[typeId]
						const localEntries = localData[typeId]
						return (
							<div className={`type ${typeStatus}`}
								key={typeId}>
								<label className='tab-label' htmlFor={`status${typeId}`}>
									<h3 className='type-name'>{typeName}</h3>
								</label>
								<input id={`status${typeId}`} type='checkbox' className='tab-checkbox' />
								<div className='entries tab-content'>
									{englishEntries.map((englishEntry, entryIndex) => {
										const localEntry = localEntries[entryIndex]
										return (
											<a className='entry'
												href={localEntry.contentfulUrl}
												target='_blank'
												rel='noopener'
												alt='Edit on Contentful'
												key={`entry${entryIndex}`}>
												{typeFields.map(({ name : fieldName, id : fieldId }) => {
													const englishField = englishEntry[fieldId]
													const localField = localEntry[fieldId]

													return (
														<div className={`field ${localField.status}`}
															key={fieldId}>
															<div className='name'>{fieldName}</div>
															<div className='local-value'>{localField.value}</div>
															<div className='english-value'>{englishField.value}</div>
														</div>
													)
												})}
											</a>
										)
									})}
								</div>
							</div>
						)
					})}
				</div>
			}
			<h1>Traslatable content</h1>
			{structure &&
				<div className='structure'>
					{structure.map(({ name, fields }) =>
						<div className='type' key={name}>
							<label className='tab-label' htmlFor={`status${name}`}>
								<h3 className='type-name'>{name}</h3>
							</label>
							<input id={`status${name}`} type='checkbox' className='tab-checkbox' />
							<ul className='tab-content'>
								{fields.map(f => <li key={f.name}>{f.name}</li>)}
							</ul>
						</div>
					)}
				</div>
			}
		</div>
	)
}
