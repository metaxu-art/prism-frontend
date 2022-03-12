import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import DropDownMenuItem from './DropDownMenuItem';

type Props = {};

const DropDownMenu: React.FC<Props> = ({ children }) => {
	const [isOpen, setIsOpenStatus] = useState(false);
	const [currentTitle, setCurrentTitle] = useState(children as string);

	return (
		<div className="relative">
			<div
				onClick={() => setIsOpenStatus((s) => !s)}
				className="bg-white border border-black px-10 py-4 font-semibold text-lg flex items-center justify-between cursor-pointer"
			>
				<span className="whitespace-nowrap">{currentTitle}</span>
				<FiChevronDown className="text-3xl" />
			</div>
			{isOpen && (
				<div className="absolute z-10 w-full overflow-y-auto max-h-[200px] border border-black">
					{[0, 1, 2, 3, 4, 5, 6].map((id) => {
						const itemName = `Item ${id}`;
						return (
							<DropDownMenuItem
								onClick={() => {
									setCurrentTitle(itemName);
									setIsOpenStatus(false);
								}}
								key={id}
							>
								Item {id}
							</DropDownMenuItem>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default DropDownMenu;
