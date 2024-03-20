import { useCallback, useState } from 'react';
import { DropDownType } from '../../dropdown/DropDown';

const useDropDown = (): [
	string[],
	(type: DropDownType, value: string) => void
] => {
	const [selected, setSelected] = useState<string[]>([]);

	const changeHandler = useCallback((type: DropDownType, value: string) => {
		setSelected((prev) => {
			const isInclude = prev.includes(value);

			if (isInclude) {
				return prev.filter((p) => p !== value);
			}
			return type === 'single' ? [value] : [...prev, value];
		});
	}, []);

	return [selected, changeHandler];
};

export default useDropDown;
