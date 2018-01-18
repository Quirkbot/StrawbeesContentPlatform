import { Carousel } from 'react-responsive-carousel'
import Head from 'next/head'

const defaults = {
	autoPlay       : true,
	emulateTouch   : true,
	showArrows     : true,
	showStatus     : false,
	showIndicators : true,
	showThumbs     : false,
	infiniteLoop   : true
}
export default ({
	options = {},
	children
}) =>
	<div className='root slider'>
		<Head>
			<link rel="stylesheet" href="/static/lib/carousel.min.css" key="/static/lib/carousel.min.css"/>
		</Head>
		<Carousel {...{ ...defaults, ...options }}>
			{children}
		</Carousel>
	</div>
