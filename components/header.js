import Link from 'src/components/link'
import LocalesMenu from 'src/components/localesMenu'

import generateUrl from 'src/utils/generateUrl'

export default ({ appProps }) =>
	<div className='root header'>
		<style jsx>{`
			.root {
				padding: 4rem 2rem 2rem 2rem;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
			.root :global(.logo){
				height: 5.5rem;
			}
			.wrapper {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				max-width: 67.5rem;
				flex-grow: 1;
			}
			@media screen and (max-width: 600px) {
				.root {
					padding: 2rem 2rem 1rem 2rem;
				}
				.root :global(.logo){
					height: 4rem;
				}
				.root :global(.logo){
					margin-bottom: 1rem;
				}
				.wrapper {
					flex-direction: column;
					align-items: flex-start;
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
