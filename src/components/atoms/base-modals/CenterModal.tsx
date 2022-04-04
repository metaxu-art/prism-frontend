import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';

type Props = { handleGreyAreaClick?: () => void; modalVisible?: boolean };

const BaseCenterModal: React.FC<Props> = ({
	children,
	handleGreyAreaClick,
	modalVisible = true,
}) => {
	const [isBrowser, setIsBrowser] = useState<boolean>(false);
	useEffect(() => {
		setIsBrowser(true);
		return () => {};
	}, []);

	if (isBrowser && modalVisible) {
		return ReactDOM.createPortal(
			<div
				className="z-50 absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-90 flex justify-center items-center"
				onClick={handleGreyAreaClick}
			>
				{children}
			</div>,
			document.getElementById('modal-root') as HTMLElement,
		);
	} else {
		return null;
	}
};

export default BaseCenterModal;
