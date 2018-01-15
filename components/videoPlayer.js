import YouTube from '@u-wave/react-youtube'

const getYouTubeId = url => {
	let id = ''
	url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
	if (url[2] !== undefined) {
		id = url[2].split(/[^0-9a-z_-]/i)
		id = id[0]
	} else {
		id = url
	}
	return id
}

export default ({
	url,
	ratio = 9 / 16,
	...otherProps
}) =>
	<div
		className='root videoPlayer'>
		<style jsx>{`
			.root {
				position: relative;
				width: 100%;
				padding-bottom: ${ratio * 100}%;
			}
			.root iframe{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		`}</style>
		{url &&
			<iframe
				src={`https://www.youtube.com/embed/${getYouTubeId(url)}`}
				frameborder="0"
				allow="autoplay; encrypted-media"
				allowfullscreen>
			</iframe>
		}
	</div>
