import React from 'react';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
type Props = {
	backLinkText?: string;
	backLinkHref?: string;
	title?: string;
};

const AdminNavigationbar: React.FC<Props> = ({ title, backLinkText, backLinkHref = '' }) => {
	return (
		<div className="w-full border-b-2 border-black py-5 px-10 2xl:px-0">
			<div className="flex items-center justify-between max-w-[1536px] mx-auto">
				<div className="w-1/4">
					<Link href={backLinkHref} passHref>
						<a className="flex items-center">
							<FiChevronLeft className="text-4xl mr-4" />
							<span className="uppercase text-xl font-semibold">{backLinkText}</span>
						</a>
					</Link>
				</div>
				<div className="w-2/4 flex justify-center">
					<span className="text-5xl font-bold">{title}</span>
				</div>
				<div className="w-1/4"></div>
			</div>
		</div>
	);
};

{
	/* <div className="w-full border-b-2 border-black py-5 px-10 2xl:px-0">
	<div className="flex items-center justify-between max-w-[1536px] mx-auto">
		<div className="w-1/4">
			<Link href="/admin/projects" passHref>
				<a className="flex items-center">
					<FiChevronLeft className="text-4xl mr-4" />
					<span className="uppercase text-xl font-semibold">Projects</span>
				</a>
			</Link>
		</div>
		<div className="w-3/4 flex justify-center">
			<span className="text-5xl font-bold">Project #{query.projectId}</span>
		</div>
		<div className="w-1/4">
			<DropDownMenu
				selectedDropDownValue={selectedCollection}
				dropDownValues={[new TraitCollection(), new MasterCollection()]}
				onDropdownValueSelected={(collection) => setSelectedCollection(collection)}
			/>
		</div>
	</div>
</div>; */
}

// <div className="w-full border-b-2 border-black py-5 px-10 2xl:px-0">
// 	<div className="flex items-center justify-between max-w-[1536px] mx-auto">
// 		<div className="w-1/4">
// 			<Link href="/admin/projects" passHref>
// 				<a className="flex items-center">
// 					<FiChevronLeft className="text-4xl mr-4" />
// 					<span className="uppercase text-xl font-semibold">Projects</span>
// 				</a>
// 			</Link>
// 		</div>
// 		<div className="w-3/4 flex justify-center">
// 			<span className="text-5xl font-bold">Project #{query.projectId}</span>
// 		</div>
// 		<div className="w-1/4">
// 			<DropDownMenu
// 				selectedDropDownValue={selectedCollection}
// 				dropDownValues={[new TraitCollection(), new MasterCollection()]}
// 				onDropdownValueSelected={(collection) => setSelectedCollection(collection)}
// 			/>
// 		</div>
// 	</div>
// </div>;

export default AdminNavigationbar;
