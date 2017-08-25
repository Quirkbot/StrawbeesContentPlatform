import Button from 'src/components/button'
import Link from 'src/components/link'

export default ({ settings }) =>
	<div className='root localesMenu'>
		<style jsx>{`
			.root {
				position: relative;
			}
			.root:hover .list {
				display: inherit;
			}
			.list {
				background-color: white;
				display: none;
				text-align: center;
				text-transform: uppercase;
				border: solid 1.5px;
				margin-top: 0.5rem;
				position: absolute;
				width: 100%;
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
		<div className='list'>
			{settings.availableLocales
				.filter(locale => locale.locale !== settings.currentLocale.locale)
				.map((locale, i) =>
				<Link
					key={i}
					to={`/${locale.basename}`}>
					{locale.languageName}
				</Link>
			)}
		</div>
	</div>
