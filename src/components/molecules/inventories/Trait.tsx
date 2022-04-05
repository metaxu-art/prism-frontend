import React from 'react';
import Image from 'next/image';
import CheckBox from '_atoms/CheckBox';
import { Token } from '_utils/interfaces/token';
import { FiArrowUp } from 'react-icons/fi';
type Props = {
	trait: Token;
	onTraitToggled?: () => void;
	checked?: boolean;
	onArrowUpClick?: () => void;
};

const Trait: React.FC<Props> = ({
	trait,
	onTraitToggled: onTokenToggled = () => {},
	checked = false,
	onArrowUpClick,
}) => {
	return (
		<div className="flex items-center justify-between pb-5">
			<div className="flex-1 flex items-center">
				<div className="relative w-20 h-20 border border-black">
					<Image
						src={trait.image}
						layout="fill"
						alt={`token ${trait.name}: ${trait.attributes.join(',')}`}
					/>
				</div>
				<div className="pl-5">
					<span className="text-xl font-bold">{trait.name}</span>
				</div>
			</div>

			<div className="flex-1 flex items-center justify-between">
				<div className="pr-10 max-w-[210px]">
					<div className="bg-white border-2 border-black text-[#A100FF] font-semibold rounded px-1 py-2 overflow-hidden text-ellipsis whitespace-nowrap">
						{trait.description || 'no attributes'}
					</div>
				</div>

				<FiArrowUp
					onClick={checked ? onArrowUpClick : undefined}
					className={`${
						checked ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-default'
					} text-2xl`}
				/>

				<div>
					<CheckBox isActive={checked} onClick={onTokenToggled} />
				</div>
			</div>
		</div>
	);
};

export default Trait;
