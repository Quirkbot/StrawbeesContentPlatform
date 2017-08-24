import Link from 'src/components/link'
import SvgIcon from 'src/components/svgIcon'

export default ({ appProps }) =>
	<div className='root footer'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 4rem 2rem 16rem;
				background-color: rgb(127,127,127);
				color: #FFF;
			}
			.root .social,
			.root .menu {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
			}
			.root .social {
				margin-bottom: 3rem;
			}
			.root .social .item {
				margin: 0.5rem;
			}
			.root .social :global(svg) {
				width: 3.5rem;
				height: 3.5rem;
				fill: #FFF;
			}
			.root .menu  {
				text-transform: uppercase;
				letter-spacing: 0.07rem;
				margin-bottom: 2rem;
			}
			.root .menu .item {
				text-transform: uppercase;
				letter-spacing: 0.07rem;
				margin: 0.5rem;
			}
			.root .menu .item :global(a){
				color: inherit;
				text-decoration: none;
			}
			.root .address {
				letter-spacing: 0.05rem;
				font-size: 0.9rem;
				font-weight: 500;
				margin-bottom: 0.7rem;
			}
			.root .copyright {
				letter-spacing: 0.05rem;
				font-size: 0.7rem;
			}
			@media print {
				.root {
					display: none;
				}
			}
		`}</style>
		<div className='social'>
			{appProps.settings.socialMediaLinks &&
				appProps.settings.socialMediaLinks.map(({ url, title }, i) =>
				<div key={i}
					className='item'>
					<Link
						to={url}>
						<SvgIcon icon={title}/>
					</Link>
				</div>
			)}
		</div>
		<div className='menu'>
			{appProps.settings.mainMenuLinks &&
				appProps.settings.mainMenuLinks.map(({ url, title }, i) =>
				<div key={i}
					className='item'>
					<Link
						to={url}>
						{title}
					</Link>
				</div>
			)}
		</div>
		<div className='address'>
			{appProps.strings.companyAddress}
		</div>
		<div className='copyright'>
			{appProps.strings.copyrightNotice.split('{{year}}').join((new Date()).getFullYear())}
		</div>
	</div>
