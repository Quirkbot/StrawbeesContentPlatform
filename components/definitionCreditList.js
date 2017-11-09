import React from 'react'
import DefinitionCredit from 'src/components/definitionCredit'
import generateClassnames from 'src/utils/generateClassnames'


export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active : true
		}
	}

	render() {
		const {
			items,
			label
		} = this.props

		const {
			active
		} = this.state

		return (
			<div
				className={`root definitionCreditList ${generateClassnames({
					active,
					label
				})}`}>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: flex-start;
						flex-wrap: wrap;
					}
					.root .label {

					}
				`}</style>
				{label &&
					<div className='label' onClick={() => { /* this.setState({ active : !active }) */ }}>
						{label}
					</div>
				}
				{active && items.map((props, i) =>
					<DefinitionCredit
						key={i}
						{...props}
					/>
				)}
			</div>
		)
	}
}
