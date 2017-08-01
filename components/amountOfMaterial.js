import Material from 'src/components/material'

export default ({
	material,
	amount
}) =>
	<div
		className='root amountOfMaterial'>
		{material &&
			<Material {...material}/>
		}
		{amount &&
			<div className='amount'>
				{amount}
			</div>
		}
	</div>
