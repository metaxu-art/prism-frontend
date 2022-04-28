import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { DropdownValue } from '_utils/models/dropdown-value';
import DropDownMenuItem from './DropDownMenuItem';

type Props = {
	selectedDropDownValue?: DropdownValue;
	dropDownValues?: DropdownValue[];
	onDropdownValueSelected?: (dropDownValue: DropdownValue) => void;
	defaultDropdownText?: string;
};

const DropDownMenu: React.FC<Props> = ({
	dropDownValues = [],
	selectedDropDownValue,
	onDropdownValueSelected = (a) => {},
	defaultDropdownText = 'no values',
}) => {
	const [isOpen, setIsOpenStatus] = useState(false);

	const hasSelectedValue = !!selectedDropDownValue;

	return (
		<div className="relative">
			<div
				onClick={() => setIsOpenStatus((s) => !s)}
				className="bg-white border-2 border-black px-10 py-4 font-semibold text-lg flex items-center justify-between cursor-pointer rounded-lg"
			>
				<span
					className={`whitespace-nowrap font-bold uppercase ${!hasSelectedValue && 'bg-grey-400'}`}
				>
					{hasSelectedValue && selectedDropDownValue?.name}
					{dropDownValues.length !== 0 && !hasSelectedValue && dropDownValues[0].name}
					{dropDownValues.length === 0 && !hasSelectedValue && defaultDropdownText}
				</span>
				<FiChevronDown className="text-3xl" />
			</div>
			{isOpen && (
				<div className="absolute z-10 w-full overflow-y-auto max-h-[200px] border-2 rounded-md border-black">
					{dropDownValues.map((dropDownValue) => {
						return (
							<DropDownMenuItem
								onClick={(e) => {
									e.stopPropagation();
									if (dropDownValue.id !== selectedDropDownValue?.id) {
										onDropdownValueSelected(dropDownValue);
									}
									setIsOpenStatus(false);
								}}
								key={dropDownValue.id}
							>
								{dropDownValue.name}
							</DropDownMenuItem>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default DropDownMenu;
