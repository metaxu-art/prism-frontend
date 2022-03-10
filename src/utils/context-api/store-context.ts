import { createContext } from 'react';
import { AuthenticationStatus } from '_utils/enums/authentication-status';
import { Signer } from '_utils/interfaces/signer';

// const [mintingProcessStatus, setMintingProcessStatus] = useState<MintingProcessStatus>(

type StoreProps = {
	signer: Signer | null;
	setSigner: React.Dispatch<React.SetStateAction<Signer | null>>;
	isUserAuthenticated: boolean;
	authenticationStatus: AuthenticationStatus;
	setUserAuthenticatingStatus: React.Dispatch<React.SetStateAction<AuthenticationStatus>>;
};

const StoreContext = createContext<StoreProps>({
	setSigner: () => {},
	signer: null,
	isUserAuthenticated: false,
	authenticationStatus: AuthenticationStatus.Idle,
	setUserAuthenticatingStatus: () => {},
});

export { StoreContext };
