import { Carousel } from 'react-responsive-carousel'

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
		<style jsx>{`

		`}</style>
		<Carousel {...{ ...defaults, ...options }}>
			{children}
		</Carousel>
	</div>
