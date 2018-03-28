import Markdown from 'react-remarkable'

import AmountOfMaterialList from 'src/components/amountOfMaterialList'
import Button from 'src/components/button'
import Breadcrumbs from 'src/components/breadcrumbs'
import ContentBlock from 'src/components/contentBlock'
import ContentHero from 'src/components/contentHero'
import ContentInitialInfo from 'src/components/contentInitialInfo'
import ContentThumbnailList from 'src/components/contentThumbnailList'
import DefinitionList from 'src/components/definitionList'
import DefinitionCreditList from 'src/components/definitionCreditList'
import LessonStep from 'src/components/lessonStep'
import NationalStandard from 'src/components/nationalStandard'
import VideoPlayer from 'src/components/videoPlayer'

const printPage = ga => {
	const page = document.location.pathname
	ga.trackPageview(`${page}${page.endsWith('/') ? '' : '/'}print`)
	window.print()
}
export default ({
	ga = null,
	appProps = null,
	breadcrumbs = null,
	color = '',
	hero = null,
	initialInfo = null,
	featuredImage = null,
	video = '',
	materials = [],
	modifications = [],
	learningObjectives = [],
	nationalStandards = [],
	teachingAssessment = '',
	preparation = [],
	lessonSteps = [],
	vocabulary = [],
	vocabularyCredits = [],
	attachments = [],
	relatedContent = []
}) =>
	<div
		className='root lessonPlanSinglePage'>
		<style jsx>{`
			.root .print-bar {
				display: none;
				position: fixed;
				left: 0;
				top: 0;
				height: 100%;
				width: 0.3cm;
				background-color: ${color};
			}
			.root .section {
				margin: 0;
				padding: 2rem 1rem;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
			.root .section.color,
			.root :global(.contentInitialInfo) {
				background-color: ${color};
				fill: white;
				color: white;
			}
			.root .section.not-color {
				background-color: #F3F3F3;
				fill: black;
				color: black;
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
			.root .featuredImage img {
				display: block;
				width: 100%;
			}
			.root .video + .featuredImage {
				display: none;
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
			}
			@media screen and (max-width: 900px) {
				.root .section.featuredImage,
				.root .section.video {
					padding: 0;
				}
			}
			@media print {
				.root {
					margin: 0cm 0 0.5cm 0.5cm;
				}
				.root .print-bar {
					display: block;
				}
				.root .section {
					padding: 0 0 0.5cm 0.5cm;
				}
				.root .section.color,
				.root .section.not-color,
				.root :global(.contentInitialInfo) {
					background-color: white;
					fill: black;
					color: black;
				}
				.root .section,
				.root :global(img),
				.root :global(.amountOfMaterial),
				.root :global(.definition),
				.root ul {
					page-break-inside: avoid;
				}
				.root .video,
				.root .featuredImage {
					display: none;
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
				.root .section .heading:before {
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
				.root .modifications :global(.contentBlock .title){
					font-size: 1rem;
				}
				.root .attachments,
				.root .pdf,
				.root .relatedContent,
				.root .materials :global(.button) {
					display: none;
				}
			}
		`}</style>
		<div className='print-bar'/>
		{breadcrumbs &&
			<Breadcrumbs {...breadcrumbs}/>
		}
		{hero &&
			<ContentHero {...hero}/>
		}
		{video &&
			<div className='section video not-color'>
				<div className='wrapper'>
					<VideoPlayer url={video}/>
				</div>
			</div>
		}
		{featuredImage &&
			<div className='section featuredImage not-color'>
				<div className='wrapper'>
					<img
						srcSet={`${featuredImage.url}?w=1024&h=580&fit=fill, ${featuredImage.url}?w=1024&h=580&fit=fill 2x`}
						src={`${featuredImage.url}?w=1024&h=580&fit=fill`}
					/>
				</div>
			</div>
		}
		{initialInfo &&
			<ContentInitialInfo {...initialInfo}/>
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
		{relatedContent && (relatedContent.length > 0) &&
			<div className='section relatedContent not-color'>
				<div className='wrapper'>
					<h3 className='heading'>{appProps.strings.relatedLessons}</h3>
					<ContentThumbnailList items={relatedContent}/>
				</div>
			</div>
		}
	</div>
