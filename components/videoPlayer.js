const getYouTubeId = url => {
	url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
	if (url[2] !== undefined) {
		return url[2].split(/[^0-9a-z_-]/i)[0]
	}
	return url
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
				src={`https://www.youtube.com/embed/${getYouTubeId(url)}?rel=0&showinfo=0`}
				frameBorder="0"
				allow="autoplay; encrypted-media"
				allowFullScreen
				{...otherProps}>
			</iframe>
		}
	</div>
