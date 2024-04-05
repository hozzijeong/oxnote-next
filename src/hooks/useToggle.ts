import { useCallback, useMemo, useState } from 'react';

export type ToggleValues = {
	toggle: () => void;
	close: () => void;
	open: () => void;
	isOn: boolean;
};

const useToggle = (initialValue = false): ToggleValues => {
	const [isOn, setIsOn] = useState(initialValue);

	const toggle = useCallback(() => setIsOn((prev) => !prev), []);
	const close = useCallback(() => setIsOn(false), []);
	const open = useCallback(() => setIsOn(true), []);

	return useMemo(
		() => ({ toggle, close, open, isOn }),
		[close, isOn, open, toggle]
	);
};

export default useToggle;
