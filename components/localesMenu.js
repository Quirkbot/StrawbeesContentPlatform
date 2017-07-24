import Link from 'src/components/link'

export default ({ currentLocale,  avaiableLocales }) =>
	<div className='localesMenu root'>
		<div>{currentLocale.languageName}</div>
		<div>
		{avaiableLocales
			.filter(locale => locale.locale !== currentLocale.locale)
			.map(locale =>
			<Link to={`/${locale.basename}`}>
				{locale.languageName}
			</Link>
		)}
		</div>
	</div>
