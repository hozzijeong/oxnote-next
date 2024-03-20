import { useCallback, useContext } from 'react';
import { DropDownContext } from '../context/DropDownProvider';

const useDropDownToggle = () => {
	const dropdownContext = useContext(DropDownContext);

	if (dropdownContext === null) {
		throw new Error('DropDownProvider 내부에서 사용해주세요');
	}

	const { open, setOpen } = dropdownContext;

	const toggleDropDown = useCallback(() => {
		setOpen((prev) => !prev);
	}, [setOpen]);

	const closeDropDown = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const openDropDown = useCallback(() => {
		setOpen(true);
	}, [setOpen]);

	return {
		open,
		toggleDropDown,
		closeDropDown,
		openDropDown,
	};
};

export default useDropDownToggle;
