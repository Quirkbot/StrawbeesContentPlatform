import generateClassnames from 'src/utils/generateClassnames'

export default ({
	strings,
	title,
	author,
	children,
	color
}) =>
	<div
		className={`root lessonPlanHero ${generateClassnames({
			title,
			author,
			color,
			children
		})}`}
		style={{
			backgroundColor : color
		}}>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				position: relative;
				width: 100%;
				padding: 2rem 1rem;
				min-height: 15rem;
			}
			.root.not-color {
				background-color: #eee;
				color: #000;
			}
			.root.color {
				color: #FFF;
			}
			.root .title,
			.root .author{
				margin-top: 0;
			}
			.root .title {
				font-size: 2.5rem;
				margin-bottom: 0;
				font-weight: 500;
			}
			.root .author {
				font-size: 1.2rem;
				font-weight: normal;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
			.root .author .key {
				font-weight: 500;
				font-style: italic;
				margin-right: 1rem;
			}

			@media screen and (max-width: 600px) {
				.root {
					padding: 1rem;
					align-items: flex-start;
					justify-content:  flex-start;
					min-height: 0;
				}
				.root .title {
					font-size: 1.2rem;
				}
				.root .author {
					font-size: 1rem;
					font-weight: normal;
					display: flex;
					flex-direction: row;
					align-items: flex-start;
					justify-content: flex-start;
				}
				.root .author .key {
					margin-right: 0.5rem;
				}
			}
			@media print {
				.root {
					padding: 1rem;
					min-height: 0;
					background-color: #FFF !important;
					color: #000 !important;
				}
				.root .title {
					font-size: 2rem;
					margin-bottom: 0;
					font-weight: 500;
				}
				.root .author {
					font-size: 1rem;
					font-weight: normal;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
				}
			}
		`}</style>
		{title &&
			<h1 className='title'>
				{title}
			</h1>
		}
		{author &&
			<div className='author'>
				<div className='key'>{strings.author}</div>
				<div className='value'>{author}</div>
			</div>
		}
		{children}
	</div>
