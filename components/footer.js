import Link from 'src/components/link'
import SvgIcon from 'src/components/svgIcon'
import Package from 'src/package.json'

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
				text-align: center;
				position: relative;
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
			.root .menu .item :global(.link){
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
			.root .version {
				position: absolute;
				bottom: 0.2rem;
				right: 0.2rem;
				letter-spacing: 0.05rem;
				font-size: 0.5rem;
				opacity: 0.5;
			}
			@media print {
				.root {
					position: fixed;
					bottom: 0;
					left: 0;
					width: 100%;
					padding: 0.2rem 1rem;
					background-color: #eee !important;
					color: #000;
					align-items: left;
				}
				.root .social,
				.root .menu,
				.root .address,
				.root .version {
					display: none;
				}
				.root .copyright {
					font-size: 5pt;
				}
			}
		`}</style>
		<div className='social'>
			{appProps.settings.socialMediaLinks &&
				appProps.settings.socialMediaLinks.map(({ url, title }, i) =>
				<div key={i}
					className='item'>
					<Link
						to={url}
						external={true}>
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
						to={url}
						external={true}>
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
		<div className='version'>
			v{Package.version}
		</div>
	</div>
