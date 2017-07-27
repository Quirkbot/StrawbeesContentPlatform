import Link from 'src/components/link'

export default ({ currentLocale, avaiableLocales }) =>
	<div className='root localesMenu'>
		<div>{currentLocale.languageName}</div>
		<div>
			{avaiableLocales
				.filter(locale => locale.locale !== currentLocale.locale)
				.map((locale, i) =>
				<Link
					key={i}
					to={`/${locale.basename}`}>
					{locale.languageName}
				</Link>
			)}
		</div>
	</div>
