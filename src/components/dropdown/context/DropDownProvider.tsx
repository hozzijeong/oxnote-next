'use client';

import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useCallback,
	useState,
} from 'react';

type DropDownContextProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export const DropDownContext = createContext<DropDownContextProps | null>(null);

const DropDownProvider = ({ children }: PropsWithChildren) => {
	const [open, setOpen] = useState(false);

	return (
		<DropDownContext.Provider value={{ open, setOpen }}>
			{children}
		</DropDownContext.Provider>
	);
};

export default DropDownProvider;
