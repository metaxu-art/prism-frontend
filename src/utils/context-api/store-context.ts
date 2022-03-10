import { createContext } from 'react';
import { Signer } from '_utils/interfaces/signer';

// const [mintingProcessStatus, setMintingProcessStatus] = useState<MintingProcessStatus>(

type StoreProps = {
	signer: Signer | null;
	setSigner: React.Dispatch<React.SetStateAction<Signer | null>>;
	isUserAuthenticated: boolean;
};

const StoreContext = createContext<StoreProps>({
	setSigner: () => {},
	signer: null,
	isUserAuthenticated: false,
});

export { StoreContext };
