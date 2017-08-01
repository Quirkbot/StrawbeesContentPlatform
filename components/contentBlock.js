import Markdown from 'react-remarkable'

import generateClassnames from 'src/utils/generateClassnames'

export default ({
	title,
	body
}) =>
	<div
		className={`root lessonPlanListItem ${generateClassnames({
			title,
			body
		})}`}>
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
