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
			padding: 2rem 3rem;
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
			font-size: 3rem;
			margin-bottom: 0;
			font-weight: 500;
		}
		.root .author {
			font-size: 1.5rem;
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

		@media (max-width: 600px) {
			.root {
				padding: 2rem 2rem;
				align-items: flex-start;
				justify-content:  flex-start;
				min-height: 0;
			}
			.root .title {
				font-size: 1.5rem;
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
