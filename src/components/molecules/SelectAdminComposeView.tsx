import React from 'react';

import Image from 'next/image';
import TertiaryButton from '_atoms/buttons/Tertiary';
import Link from 'next/link';

// import abi from '../../../abi.json';
// import { ethers } from 'ethers';
// import config from '_utils/config/index';

// const provider = new ethers.providers.AlchemyProvider(
// 	`maticmum`,
// 	'Z3lPhWsTamnqsW-sxVTx20hmB_lXA2Cu',
// );

// const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
// const privateKey = '2164f3311f120743f8380f850c89386d8090901307f499d163592c175fe62875';
// const signer = new ethers.Wallet(privateKey);
// const signer = provider.getSigner();
// const contractWithSigner = new ethers.Contract(config.contractAddress, abi, signer);
// const callableContract = new ethers.Contract(config.contractAddress, abi, provider);

const SelectAdminComposeView = () => {
	return (
		<div className="w-full max-w-[600px] mx-auto shadow-l  py-16 px-16 rounded-lg flex flex-col items-center">
			<div className="relative w-[250px] h-[205px] rounded-lg overflow-hidden bg-red-200 mb-8 border-2 border-opacity-50">
				<Image src="/images/prism.png" alt="Prism logo" layout="fill" />
			</div>
			<div className="w-full flex items-center">
				<div className="w-full pr-4">
					<Link href="/admin/projects" passHref>
						<a>
							<TertiaryButton>
								<span className="uppercase font-bold">FOR ARTISTS</span>
							</TertiaryButton>
						</a>
					</Link>
				</div>
				<div className="w-full pl-4">
					<Link href="/compose" passHref>
						<a>
							<TertiaryButton>
								<span className="uppercase font-bold">FOR COLLECTORS</span>
							</TertiaryButton>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SelectAdminComposeView;
