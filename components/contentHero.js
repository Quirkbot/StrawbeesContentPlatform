import AngledLabel from 'src/components/angledLabel'
import AgeGroupTitleList from 'src/components/ageGroupTitleList'
import TagTitleList from 'src/components/tagTitleList'
import generateClassnames from 'src/utils/generateClassnames'

export default ({
	title = '',
	description = '',
	authorLabel = '',
	author = '',
	ageGroups = [],
	tags = [],
	contentTypeTitle = '',
	featuredImage = null,
	video = '',
	color = '',
	textColor = ''
}) =>
	<div
		className={`root contentHero ${generateClassnames({
			title,
			description,
			authorLabel,
			author,
			ageGroups,
			tags,
			contentTypeTitle,
			featuredImage,
			video,
			color
		})}`}>
		<style jsx>{`
			.root {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				color: ${textColor};
				padding: 3rem 1rem;
				background-color: ${color};
				background-size: cover;
				background-position: center;
				${featuredImage &&
					`background-image : url(${featuredImage.url}?w=1000&h=300&fit=fill)`}

			}
			.root .colorOverlay {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: ${color};
				opacity: 0.8;
			}
			.root :global(.angledLabel) {
				position: absolute;
				top: 0;
				left: 0;
			}
			.root .content {
				position: relative;
				z-index: 1;
				width: 70rem;
				max-width: 70rem;
				text-align: center;
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			.root .content .title {
				font-size: 3rem;
				text-transform: uppercase;
				margin: 0;
			}
			.root .content .description {
				font-size: 1.5rem;
				margin: 0 0 1rem 0;
				font-style: italic;
			}
			.root .content .author {
				display: flex;
				flex-direction: row;
				margin-bottom: 1rem;
			}
			.root .content .author .label {
				font-weight: bold;
				margin-right: 0.5rem;
			}
			@media screen and (max-width: 900px) {
				.root {
					padding-left: 2rem;
					padding-right: 2rem;
				}
				.root .content {
					text-align: left;
					align-items: flex-start;
				}
				.root .content .title {
					font-size: 2rem;
					text-transform: uppercase;
					margin: 0;
				}
				.root .content .description {
					font-size: 1rem;
					margin: 0 0 0.5rem 0;
				}
			}
			@media print {
				.root {
					background-color: white;
					background-image: none;
				}
				.root .colorOverlay {
					display: none;
				}
				.root .content {
					color: black;
					text-align: left;
					align-items: flex-start;
				}
			}
		`}</style>
		<div className='colorOverlay'/>
		{contentTypeTitle &&
			<AngledLabel>
				{contentTypeTitle}
			</AngledLabel>
		}
		<div className='content'>
			{title &&
				<h1 className='title'>
					{title}
				</h1>
			}
			{description &&
				<p className='description'>
					{description}
				</p>
			}
			{author &&
				<div className='author'>
					{authorLabel &&
						<div className='label'>
							{authorLabel}
						</div>
					}
					<div className='name'>
						{author}
					</div>
				</div>
			}
			{ageGroups &&
				<AgeGroupTitleList items={ageGroups} />
			}
			{tags &&
				<TagTitleList items={tags} />
			}
		</div>
	</div>
