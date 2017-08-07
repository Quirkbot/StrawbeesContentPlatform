import Markdown from 'react-remarkable'

import AmountOfMaterial from 'src/components/amountOfMaterial'
import Button from 'src/components/button'
import Breadcrumbs from 'src/components/breadcrumbs'
import ContentBlock from 'src/components/contentBlock'
import Definition from 'src/components/definition'
import Hero from 'src/components/hero'
import LessonPlanListItem from 'src/components/lessonPlanListItem'
import LessonStep from 'src/components/lessonStep'
import NationalStandard from 'src/components/nationalStandard'
import Slider from 'src/components/slider'

import generateClassnames from 'src/utils/generateClassnames'

export default ({
	appProps,
	breadcrumbs,
	color,
	hero,
	featuredImage,
	description,
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
	attachments,
	pdfUrl,
	relatedLessonPlans,
	nextLessonPlan
}) =>
	<div
		className={`root lessonPlanSinglePage ${generateClassnames({
			color
		})}`}>
		<style jsx>{`
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
		`}</style>
		{breadcrumbs &&
			<Breadcrumbs {...breadcrumbs}/>
		}
		<div
			className='content'
			style={{
				backgroundColor : color
			}}>
			{hero &&
				<Hero {...appProps}{...hero}/>
			}
			{featuredImage &&
				<img className='featuredImage'
					srcSet={`${featuredImage.url}?w=1024&h=580&fit=fill, ${featuredImage.url}?w=1024&h=580&fit=fill 2x`}
					src={`${featuredImage.url}?w=1024&h=580&fit=fill`}
				/>
			}
			<div className='not-color'>
				{description &&
					<p className='description'>
						{description}
					</p>
				}
				{tags &&
					<div className='tags'>
						{tags.map(({ title }, i) =>
							<div
								key={i}
								className='tag'>
								{title}
							</div>
						)}
					</div>
				}
			</div>
			<div className='color row'>
				<div className='info'>
					{duration &&
						<div className='row'>
							<h3 className='heading'>{appProps.strings.duration}</h3>
							<p>{duration.title}</p>
						</div>
					}
					{classSize &&
						<div className='row'>
							<h3 className='heading'>{appProps.strings.classSize}</h3>
							<p>{classSize.title}</p>
						</div>
					}
					{groupSize &&
						<div className='row'>
							<h3 className='heading'>{appProps.strings.groupSize}</h3>
							<p>{groupSize.title}</p>
						</div>
					}
					{overview &&
						<div>
							<h3 className='heading'>{appProps.strings.overview}</h3>
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
			</div>
			{materials &&
				<div className='materials not-color'>
					<h3 className='heading'>{appProps.strings.materials}</h3>
					{materials.map((props, i) =>
						<AmountOfMaterial
							key={i}
							{...props}
						/>
					)}
					<Button
						icon='shopping'
						title={appProps.strings.shop}
						url={appProps.settings.storeUrl}
					/>
				</div>
			}
			{modifications &&
				<div className='modifications color'>
					<h3 className='heading'>{appProps.strings.modifications}</h3>
					{modifications.map((props, i) =>
						<ContentBlock
							key={i}
							{...props}
						/>
					)}
				</div>
			}
			{learningObjectives &&
				<div className='learningObjectives not-color'>
					<h3 className='heading'>{appProps.strings.learningObjectives}</h3>
					{learningObjectives.map((props, i) =>
						<ContentBlock
							key={i}
							{...props}
						/>
					)}
				</div>
			}
			{nationalStandards &&
				<div className='nationalStandards color'>
					<h3 className='heading'>{appProps.strings.nationalStandards}</h3>
					{nationalStandards.map((props, i) =>
						<NationalStandard
							key={i}
							{...props}
						/>
					)}
				</div>
			}
			{teachingAssessment &&
				<div className='teachingAssessment not-color'>
					<h3 className='heading'>{appProps.strings.teachingAssessment}</h3>
					<Markdown source={teachingAssessment}/>
				</div>
			}
			{preparation &&
				<div className='preparation color'>
					<h3 className='heading'>{appProps.strings.preparation}</h3>
					{preparation.map((props, i) =>
						<div
							key={i}
							className='step'>
							<div className='step'>{i + 1}</div>
							<ContentBlock {...props} />
						</div>
					)}
				</div>
			}
			{lessonSteps &&
				<div className='lessonSteps not-color'>
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
			}
			{vocabulary &&
				<div className='vocabulary color'>
					<h3 className='heading'>{appProps.strings.vocabulary}</h3>
					{vocabulary.map((props, i) =>
						<Definition
							key={i}
							{...props}
						/>
					)}
				</div>
			}
			{attachments &&
				<div className='attachments not-color'>
					<h3 className='heading'>{appProps.strings.attachments}</h3>
					{attachments.map((props, i) =>
						<Button
							key={i}
							icon='download'
							{...props}
						/>
					)}
				</div>
			}
			<div className='pdf color'>
				<h3 className='heading'>{appProps.strings.saveAsPrintableFile}</h3>
				<Button
					icon='download'
					title={appProps.strings.download}
					url={pdfUrl}
				/>
			</div>
			{relatedLessonPlans &&
				<div className='relatedLessonPlans not-color'>
					<h3 className='heading'>{appProps.strings.relatedLessons}</h3>
					{relatedLessonPlans.map((props, i) =>
						<LessonPlanListItem
							key={i}
							{...props}
						/>
					)}
				</div>
			}
			{nextLessonPlan &&
				<div className='nextLessonPlan not-color'>
					<h3 className='heading'>{appProps.strings.nextLesson}</h3>
					<LessonPlanListItem
						{...nextLessonPlan}
					/>
				</div>
			}
		</div>
	</div>
