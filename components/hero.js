import generateClassnames from 'src/utils/generateClassnames'

export default ({
	children = null,
	title = '',
	subtitle = '',
	description = '',
	authorLabel = '',
	author = '',
	color = '#eee',
	textColor = 'black'
}) =>
	<div
		className={`root hero ${generateClassnames({
			title,
			subtitle,
			description,
			author,
			color,
			children
		})}`}>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				position: relative;
				width: 100%;
				padding: 2rem 1rem;
				margin-bottom: 3rem;
				min-height: 22rem;
				background-color: ${color};
				color: ${textColor}
			}
			.wrapper {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				max-width: 60rem
			}
			.wrapper .icon,
			.wrapper .info {
				width: 50%;
			}
			.wrapper .info {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
			}
			.wrapper .icon .image {
				width: 100%;
				height: auto;
			}
			.wrapper .info .description {
				font-size: 1.2rem;
			}
			.wrapper .info .title,
			.wrapper .info .subtitle,
			.wrapper .info .author,
			.wrapper .info .description {
				margin-top: 0;
			}
			.wrapper .info .title {
				font-size: 2.5rem;
				margin-bottom: 1rem;
			}
			.wrapper .info .subtitle {
				font-size: 1.2rem;
				margin-top: -1.5rem;
			}

			@media screen and (max-width: 1000px) {
				.wrapper .icon {
					padding-left: 0;
				}
				.wrapper .info {
					padding-right: 0;
				}
			}
			@media screen and (max-width: 600px) {
				.root {
					padding: 1rem;
					margin-bottom: 1rem;
					min-height: 0;
				}
				.wrapper {
					flex-direction: column;
				}
				.wrapper .icon,
				.wrapper .info {
					width: 100%;
				}
				.wrapper .info .title {
					font-size: 2rem;
				}
				.wrapper .info .subtitle {
					margin-top: -1.2rem;
				}
				.wrapper .info .description {
					font-size: 1rem;
				}
			}
			@media print {
				.root {
					background-color: #FFF !important;
					color: #000 !important;
				}
			}
		`}</style>
		<div className='wrapper'>
			<div className='info'>
				{title &&
					<h1 className='title'>
						{title}
					</h1>
				}
				{subtitle &&
					<h2 className='subtitle'>
						{subtitle}
					</h2>
				}
				{author &&
					<div className='author'>
						{authorLabel &&
							<b>{authorLabel}</b>
						}
						<span>{author}</span>
					</div>
				}
				{description &&
					<p className='description'>
						{description}
					</p>
				}
				{children}
			</div>
		</div>
	</div>
