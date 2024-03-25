import useToggle from '@/hooks/useToggle';
import { useEffect, useRef } from 'react';

const useDropDownToggleController = () => {
	const toggles = useToggle();
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				toggles.close();
			}
		};

		const handleKeyDownHandler = (event: KeyboardEvent) => {
			const { code } = event;

			if (code === 'Escape' || code === 'Backspace') {
				toggles.close();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDownHandler);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDownHandler);
		};
	}, [toggles]);

	return { toggles, dropdownRef };
};

export default useDropDownToggleController;
