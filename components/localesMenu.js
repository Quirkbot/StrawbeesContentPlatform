import Button from 'src/components/button'
import Link from 'src/components/link'

export default ({ settings }) => {
	const otherLocales = settings.locales
	.filter(locale => locale.locale !== settings.currentLocale.locale)

	if (!otherLocales.length) {
		return null
	}

	return (
		<div className='root localesMenu'>
			<style jsx>{`
				.root {
					position: relative;
				}
				.root:hover .list,
				.root:hover .spacer {
					display: inherit;
				}
				.spacer {
					background-color: rgba(0,0,0,0);
					display: none;
					position: absolute;
					width: 100%;
					height: 0.5rem;
				}
				.list {
					background-color: white;
					display: none;
					text-align: center;
					text-transform: uppercase;
					border: solid 1.5px;
					position: absolute;
					width: 100%;
					margin-top: 0.5rem;
				}
				.list :global(.link){
					cursor: pointer;
					text-decoration: none;
					color: inherit;
					display: block;
					margin: 0.2rem 0;
				}
				@media print {
					.root {
						display: none;
					}
				}
			`}</style>
			<Button
				border={false}
				icon='language'
				title={settings.currentLocale.languageName}
			/>
			<div className='spacer'/>
			<div className='list'>
				{otherLocales
					.map((locale, i) =>
					<Link
						key={i}
						to={`/${locale.basename}`}>
						{locale.languageName}
					</Link>
				)}
			</div>
		</div>
	)
}
