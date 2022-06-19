import React, { useEffect, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import SquareIconButton from '_atoms/buttons/SquareIcon';
import PrimaryInput from '_atoms/inputs/Primary';

export type AttributeInputValue = {
	name: string;
	value: string;
};

type Props = {
	handleAttributeValuesChanged?: (a: AttributeInputValue[]) => void;
};

const InteractiveAttributesInputs: React.FC<Props> = ({
	handleAttributeValuesChanged = () => {},
}) => {
	const [attributeValues, setAttributeValues] = useState<AttributeInputValue[]>([
		{ name: '', value: '' },
	]);

	const handleMinusClick = () => {
		if (attributeValues.length > 1) {
			const attributeValuesTemp = [...attributeValues];
			attributeValuesTemp.splice(attributeValues.length - 1, 1);
			setAttributeValues(attributeValuesTemp);
		}
	};

	const handlePlusClick = () => {
		setAttributeValues((oldList) => [...oldList, { name: '', value: '' }]);
	};

	const handleAttributeValueChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const attributeValuesTemp = [...attributeValues];
		(attributeValuesTemp[index] as any)[e.target.name] = e.target.value;
		setAttributeValues(attributeValuesTemp);
	};

	useEffect(() => {
		const attributeValuesTemp = [...attributeValues];
		const filteredAttributeValues = attributeValuesTemp.filter((attributeValue) => {
			return attributeValue.name && attributeValue.value;
		});
		handleAttributeValuesChanged(filteredAttributeValues);
	}, [attributeValues]);

	return (
		<div>
			<div className="flex justify-between items-center pb-3">
				<span className="font-bold text-xl">Attributes</span>
				<div className="flex items-center">
					<div className="pr-2">
						<SquareIconButton
							onClick={handleMinusClick}
							backgroundColor="red"
							icon={<FiMinus className="font-bold" />}
						/>
					</div>
					<SquareIconButton onClick={handlePlusClick} backgroundColor="purple" icon={<FiPlus />} />
				</div>
			</div>

			<div className="max-h-[350px] overflow-y-auto">
				{/* Inputs */}
				{attributeValues.map((attributeInput, index) => {
					return (
						<div key={index} className="pb-5">
							<div className="flex items-center pb-2">
								<label className="text-lg font-bold w-24">Name:</label>
								<PrimaryInput
									name="name"
									value={attributeInput.name}
									onChange={(e) => handleAttributeValueChange(index, e)}
								/>
							</div>
							<div className="flex items-center">
								<label className="text-lg font-bold w-24">Value:</label>
								<PrimaryInput
									value={attributeInput.value}
									name="value"
									onChange={(e) => handleAttributeValueChange(index, e)}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default InteractiveAttributesInputs;
