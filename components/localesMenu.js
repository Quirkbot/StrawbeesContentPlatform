import Link from 'src/components/link'

export default ({ settings }) =>
	<div className='root localesMenu'>
		<div>{settings.currentLocale.languageName}</div>
		<div>
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
