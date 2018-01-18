import Markdown from 'react-remarkable'

import AmountOfMaterialList from 'src/components/amountOfMaterialList'
import Button from 'src/components/button'
import Breadcrumbs from 'src/components/breadcrumbs'
import ContentBlock from 'src/components/contentBlock'
import DefinitionList from 'src/components/definitionList'
import DefinitionCreditList from 'src/components/definitionCreditList'
import LessonPlanHero from 'src/components/lessonPlanHero'
import LessonPlanThumbnailList from 'src/components/lessonPlanThumbnailList'
import LessonStep from 'src/components/lessonStep'
import NationalStandard from 'src/components/nationalStandard'
import Slider from 'src/components/slider'
import VideoPlayer from 'src/components/videoPlayer'

import generateClassnames from 'src/utils/generateClassnames'

const printPage = ga => {
	const page = document.location.pathname
	ga.trackPageview(`${page}${page.endsWith('/') ? '' : '/'}print`)
	window.print()
}
export default ({
	ga,
	appProps,
	breadcrumbs,
	ageGroups = [],
	color,
	hero,
	featuredImage,
	description,
	video,
	tags,
	duration,
	classSize,
	groupSize,
	overview,
	gallery,
	materials,
	modifications,
	learningObjectives,
	nationalStandards,
	teachingAssessment,
	preparation,
	lessonSteps,
	vocabulary,
	vocabularyCredits,
	attachments,
	relatedLessonPlans
}) =>
	<div
		className={`root lessonPlanSinglePage ${generateClassnames({
			color
		})}`}>
		<style jsx>{`
			.root .print-bar {
				display: none;
				position: fixed;
				left: 0;
				top: 0;
				height: 100%;
				width: 0.3cm;
			}
			.root .print-age {
				display: none;
				position: fixed;
				padding: 0.1rem 0.4rem;
				color: #FFF;
				right: 2rem;
				top: 0;
				height: 3rem;
				width: 5rem;
				z-index: 3;
				text-align: right;
				flex-direction: column;
				align-content: flex-end;
			}
			.root .print-age .label {
				font-size: 0.8rem;
			}
			.root .print-age .age {
				font-size: 1.2rem;
				font-weight: 500;
				line-height: 1.2rem;
			}
			.root.not-color .content,
			.root.color .content .not-color{
				background-color: #F3F3F3;
				fill: #000;
				color: #000;
			}
			.root.color .content {
				color: #FFF;
				fill: #FFF;
			}
			.root .row {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.root .section {
				margin: 0;
				padding: 2rem 1rem;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
			.root .section .wrapper{
				position: relative;
				width: 100%;
				max-width: 60rem;
			}
			.root .section .heading{
				width: 100%;
				text-align: center;
				font-size: 2rem;
				margin: 0 0 2rem 0;
			}
			.root .section :global(.contentBlock){
				margin-bottom: 1rem;
			}
			.root .section :global(.contentBlock:last-of-type){
				margin-bottom: 0;
			}
			.root .video {
				width: 100%;
			}
			.root .featuredImage img{
				display: block;
				width: 100%;
			}
			.root .description-tags {
				padding: 1rem;
			}
			.root .description-tags .wrapper {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.root .description-tags .description {
				margin: 0;
				font-size: 1.2rem;
				text-align: center;
			}
			.root .description-tags .tags {
				margin-top: 1rem;
				flex-wrap: wrap;
				justify-content: center;
			}
			.root .description-tags .tags :global(> *) {
				margin: 0.5rem;
			}
			.root .initialInfo .info,
			.root .initialInfo .gallery,
			.root .initialInfo .gallery-print {
				width: 50%;
			}
			.root .initialInfo .info {
				padding: 2rem;
			}
			.root .initialInfo .info .row {
				align-items: baseline;
			}
			.root .initialInfo .info .key {
				font-size: 1.2rem;
				margin-right: 1rem;
			}
			.root .initialInfo .info .key,
			.root .initialInfo .info .value {
				margin-top: 0;
				margin-bottom: 0;
			}
			.root .initialInfo .info .overview {
				margin-top: 2rem;
			}
			.root .initialInfo .info .overview :global(p:first-child) {
				margin-top: 0;
			}
			.root .initialInfo .info .overview :global(p:last-child) {
				margin-bottom: 0;
			}
			.root .initialInfo .gallery-print {
				display: none;
				flex-direction: row;
				flex-wrap: wrap;
				padding-left: 2rem;
			}
			.root .initialInfo .gallery-print > * {
				width: calc(50% - 1rem);
				margin: 0.5rem;
			}
			.root .initialInfo .gallery-print img {
				display: block;
				width: 100%;
			}
			.root .materials .wrapper {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.root .materials .wrapper :global(.button) {
				margin-top: 2rem;
			}
			.root .materials .heading {
				margin-bottom: 0;
			}
			.root .modifications :global(.contentBlock){
				margin-bottom: 2rem;
			}
			.root .modifications :global(.contentBlock:last-child){
				margin-bottom: 0;
			}
			.root .modifications :global(.contentBlock .title){
				margin: 0;
				font-weight: 500;
				font-size: 1.2rem;
				font-style: italic;
			}
			.root .modifications :global(.contentBlock),
			.root .learningObjectives :global(.contentBlock){
				padding-left: 1.5rem;
				position: relative;
			}
			.root .modifications :global(.contentBlock:before),
			.root .learningObjectives :global(.contentBlock:before){
				display: block;
				position: absolute;
				content: '';
				left: 0;
				top: 0.2rem;
				width: 1rem;
				height: 1rem;
				border-radius: 1rem;
				border: solid 1px;
			}
			.root .preparation .step {
				display: flex;
				flex-direction: row;
				align-items: baseline;
				margin-bottom: 1rem;
			}
			.root .preparation .step:last-child {
				margin-bottom: 0;
			}
			.root .preparation .step .number {
				width: 1.5rem;
				height: 1.5rem;
				line-height: 1.4rem;
				text-align: center;
				margin-right: 0.5rem;
				border-radius: 1.5rem;
				border: solid 1px;
				flex: 0 0 auto;
			}
			.root .lessonSteps :global(.lessonStep) {
				page-break-inside: avoid;
			}
			.root .vocabulary :global(.definitionCreditList) {
				margin-top: 3rem;
			}
			.root .attachments :global(.button) {
				margin-bottom: 1rem;
			}
			.root .attachments :global(.button:last-child) {
				margin-bottom: 0;
			}
			.root .attachments .wrapper,
			.root .pdf .wrapper {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			.root .relatedLessonPlans .wrapper{
				max-width: 100%;
			}

			@media screen and (max-width: 600px) {
				.root .section {
					padding: 1rem;
				}
				.root .section .heading{
					font-size: 2rem;
				}
				.root .description-tags .description {
					margin: 0;
					font-size: 1.2rem;
					text-align: center;
				}
				.root .initialInfo .info {
					padding: 0;
				}
			}
			@media screen and (max-width: 900px) {
				.root .initialInfo .wrapper {
					flex-direction: column;
				}
				.root .initialInfo .info,
				.root .initialInfo .gallery {
					width: 100% ;
				}
			}
			@media screen and (min-width:1080px){
				.root .initialInfo  {
					padding: 2rem 1rem;
				}
			}
			@media print {
				.root .print-bar {
					display: block;
				}
				.root .print-age {
					display: flex;
				}
				.root .content {
					margin-left: 1cm;
					margin-right: 1cm;
				}
				.root.not-color .content,
				.root.color .content .not-color{
					background-color: #FFF;
					fill: #000;
					color: #000;
				}
				.root.color .content {
					background-color: #FFF !important;
					fill: #000;
					color: #000;
				}
				.root .section,
				.root :global(img),
				.root ul {
					page-break-inside: avoid;
				}
				.root :global(.lessonPlanHero),
				.root .section:not(.featuredImage):not(.description-tags),
				.root .lessonSteps :global(.lessonStep){
					padding-top: 2cm;
					padding-bottom: 0;
				}
				.root .section .heading{
					text-align: left;
					font-size: 1.2rem;
					margin: 0;
					position: relative;
				}
				.root .description-tags .description {
					font-size: 1rem;
				}
				.root .initialInfo .info .key {
					position: relative;
				}
				.root .section .heading:before,
				.root .initialInfo .info .key:before{
					position: absolute;
					content: '';
					width: 0.5rem;
					height: 0.5rem;
					left: -1rem;
					top: 0.6rem;
					background-color: #000 !important;
				}
				.root .featuredImage {
					padding: 1rem;
					padding-bottom: 0;
				}
				.root .featuredImage .wrapper{
					max-width: 15cm;
				}
				.root .initialInfo .info {
					padding: 0;
				}
				.root .initialInfo .info .overview {
					margin-top: 0;
				}
				.root .initialInfo .gallery {
					display: none;
				}
				.root .initialInfo .gallery-print {
					display: flex;
				}
				.root .modifications :global(.contentBlock .title){
					font-size: 1rem;
				}
				.root .attachments,
				.root .pdf,
				.root .relatedLessonPlans,
				.root .materials :global(.button) {
					display: none;
				}
			}
		`}</style>
		{breadcrumbs &&
			<Breadcrumbs {...breadcrumbs}/>
		}
		<div className='print-bar'
			style={{
				backgroundColor : color
			}}
		/>
		{ageGroups && ageGroups[0] && ageGroups[0].title &&
			<div className='print-age'
				style={{
					backgroundColor : color
				}}>
				<div className='label'>
					{appProps.strings.ageGroup}
				</div>
				<div className='age'>
					{ageGroups[0].title.title}
				</div>
			</div>
		}
		<div
			className='content'
			style={{
				backgroundColor : color
			}}>
			{hero &&
				<LessonPlanHero {...appProps}{...hero}/>
			}
			{video &&
				<div className='section video not-color'>
					<div className='wrapper'>
						<VideoPlayer url={video}/>
					</div>
				</div>
			}
			{(!video && featuredImage) &&
				<div className='section featuredImage not-color'>
					<div className='wrapper'>
						<img
							srcSet={`${featuredImage.url}?w=1024&h=580&fit=fill, ${featuredImage.url}?w=1024&h=580&fit=fill 2x`}
							src={`${featuredImage.url}?w=1024&h=580&fit=fill`}
						/>
					</div>
				</div>
			}
			{(description || tags) &&
				<div className='section description-tags not-color'>
					<div className='wrapper'>
						{description &&
							<p className='description'>
								{description}
							</p>
						}
						{tags &&
							<div className='tags row'>
								{tags.map(({ title }, i) =>
									<Button
										key={i}
										className='tag'
										title={title}
									/>
								)}
							</div>
						}
					</div>
				</div>
			}
			{(duration || classSize || groupSize || overview) &&
				<div className='section initialInfo color row'>
					<div className='wrapper row'>
						<div className='info'>
							{duration &&
								<div className='row'>
									<h3 className='key'>{appProps.strings.duration}</h3>
									<p className='value'>{duration.title}</p>
								</div>
							}
							{classSize &&
								<div className='row'>
									<h3 className='key'>{appProps.strings.classSize}</h3>
									<p className='value'>{classSize.title}</p>
								</div>
							}
							{groupSize &&
								<div className='row'>
									<h3 className='key'>{appProps.strings.groupSize}</h3>
									<p className='value'>{groupSize.title}</p>
								</div>
							}
							{overview &&
								<div className='overview'>
									<h3 className='key'>{appProps.strings.overview}</h3>
									<Markdown source={overview}/>
								</div>
							}
						</div>
						{gallery &&
							<div className='gallery'>
								<Slider>
									{gallery.map(({ url }, i) =>
										<div key={i}>
											<img srcSet={`${url}?w=500&h=500&fit=fill, ${url}?w=1000&h=1000&fit=fill 2x`}
												src={`${url}?w=1000&h=1000&fit=fill`}
											/>
										</div>
									)}
								</Slider>
							</div>
						}
						{gallery &&
							<div className='gallery-print'>
								{gallery.map(({ url }, i) =>
									<div key={i}>
										<img srcSet={`${url}?w=500&h=500&fit=fill, ${url}?w=1000&h=1000&fit=fill 2x`}
											src={`${url}?w=1000&h=1000&fit=fill`}
										/>
									</div>
								)}
							</div>
						}
					</div>
				</div>
			}
			{materials && (materials.length > 0) &&
				<div className='section materials not-color'>
					<div className='wrapper'>
						<h3 className='heading'>{appProps.strings.materials}</h3>
						<AmountOfMaterialList items={materials}/>
						<Button
							icon='shopping'
							title={appProps.strings.shop}
							url={appProps.settings.storeUrl}
							external={true}
						/>
					</div>
				</div>
			}
			{modifications && (modifications.length > 0) &&
				<div className='section modifications color'>
					<div className='wrapper'>
						<h3 className='heading'>{appProps.strings.modifications}</h3>
						{modifications.map((props, i) =>
							<ContentBlock
								key={i}
								{...props}
							/>
						)}
					</div>
				</div>
			}
			{learningObjectives && (learningObjectives.length > 0) &&
				<div className='section learningObjectives not-color'>
					<div className='wrapper'>
						<h3 className='heading'>{appProps.strings.learningObjectives}</h3>
						{learningObjectives.map((props, i) =>
							<ContentBlock
								key={i}
								{...props}
							/>
						)}
					</div>
				</div>
			}
			{nationalStandards && (nationalStandards.length > 0) &&
				<div className='section nationalStandards color'>
					<div className='wrapper'>
						<h3 className='heading'>{appProps.strings.nationalStandards}</h3>
						{nationalStandards.map((props, i) =>
							<NationalStandard
								key={i}
								{...props}
							/>
						)}
					</div>
				</div>
			}
			{teachingAssessment &&
				<div className='section teachingAssessment not-color'>
					<div className='wrapper'>
						<h3 className='heading'>{appProps.strings.teachingAssessment}</h3>
						<Markdown source={teachingAssessment}/>
					</div>
				</div>
			}
			{preparation && (preparation.length > 0) &&
				<div className='section preparation color'>
					<div className='wrapper'>
						<h3 className='heading'>{appProps.strings.preparation}</h3>
						{preparation.map((props, i) =>
							<div
								key={i}
								className='step'>
								<div className='number'>{i + 1}</div>
								<ContentBlock {...props} />
							</div>
						)}
					</div>
				</div>
			}
			{lessonSteps && (lessonSteps.length > 0) &&
				<div className='section lessonSteps not-color'>
					<div className='wrapper'>
						<h3 className='heading'>{appProps.strings.lessonSteps}</h3>
						{lessonSteps.map((props, i) =>
							<LessonStep
								key={i}
								{...{
									appProps,
									number : i + 1,
									...props
								}}
							/>
						)}
					</div>
				</div>
			}
			{vocabulary && (vocabulary.length > 0) &&
				<div className='section vocabulary color'>
					<div className='wrapper'>
						<h3 className='heading'>{appProps.strings.vocabulary}</h3>
						<DefinitionList items={vocabulary}/>
						{vocabularyCredits && (vocabularyCredits.length > 0) &&
							<DefinitionCreditList items={vocabularyCredits}/>
						}
					</div>
				</div>
			}
			{attachments && (attachments.length > 0) &&
				<div className='section attachments not-color'>
					<div className='wrapper'>
						<h3 className='heading'>{appProps.strings.attachments}</h3>
						{attachments.map((props, i) =>
							<Button
								key={i}
								icon='download'
								external={true}
								{...props}
							/>
						)}
					</div>
				</div>
			}
			<div className='section pdf color'>
				<div className='wrapper'>
					<h3 className='heading'>{appProps.strings.printFriendly}</h3>
					<Button
						icon='print'
						title={appProps.strings.print}
						onClick={() => printPage(ga)}
					/>
				</div>
			</div>
			{relatedLessonPlans && (relatedLessonPlans.length > 0) &&
				<div className='section relatedLessonPlans not-color'>
					<div className='wrapper'>
						<h3 className='heading'>{appProps.strings.relatedLessons}</h3>
						<LessonPlanThumbnailList items={relatedLessonPlans}/>
					</div>
				</div>
			}
		</div>
	</div>
