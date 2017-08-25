import Markdown from 'react-remarkable'

import generateClassnames from 'src/utils/generateClassnames'

export default ({
	title,
	body
}) =>
	<div
		className={`root contentBlock ${generateClassnames({
			title,
			body
		})}`}>
		<style jsx>{`
			.body :global(p:first-child) {
				margin-top: 0;
			}
			.body :global(p:last-child) {
				margin-bottom: 0;
			}
			.body :global(>div >span) {
				display: block;
			}
		`}</style>
		{title &&
			<div className='title'>
				{title}
			</div>
		}
		{body &&
			<div className='body'>
				<Markdown source={body}/>
			</div>
		}
	</div>
