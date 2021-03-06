import Link from 'src/components/link'
import LocalesMenu from 'src/components/localesMenu'

import generateUrl from 'src/utils/generateUrl'

export default ({ appProps }) =>
	<div className='root header'>
		<style jsx>{`
			.root {
				padding: 1rem;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
			.root :global(.logo){
				height: 7.5rem;
			}
			.wrapper {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				max-width: 70rem;
				flex-grow: 1;
			}
			@media screen and (max-width: 600px) {
				.root {
					padding: 1rem 1rem 0 1rem;
				}
				.root :global(.logo){
					height: 4rem;
					margin-bottom: 1rem;
				}
			}
			@media screen and (max-width: 290px) {
				.root :global(.logo){
					display: none;
				}
			}
			@media print {
				.root {
					display: none;
				}
			}
		`}</style>
		<div className='wrapper'>
			<Link to={generateUrl({ appProps })}>
				<img className='logo' src={appProps.settings.logo.url}/>
			</Link>
			<LocalesMenu {...appProps}/>
		</div>
	</div>
