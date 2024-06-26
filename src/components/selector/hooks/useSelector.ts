import type { DropDownType } from '@/components/dropdown/types';
import { useCallback, useState } from 'react';
import useIsBelowWidth from '@/hooks/useIsBelowWidth';

type Params = {
	initialData?: string[];
	belowWidth?: number;
};

const useSelector = ({ initialData = [], belowWidth = 520 }: Params = {}) => {
	const [selected, setSelected] = useState<string[]>(initialData);

	const changeHandler = useCallback((type: DropDownType, value: string) => {
		setSelected((prev) => {
			const isInclude = prev.includes(value);

			if (isInclude) {
				return prev.filter((p) => p !== value);
			}
			return type === 'single' ? [value] : [...prev, value];
		});
	}, []);

	const isModal = useIsBelowWidth(belowWidth);

	return {
		selected,
		changeHandler,
		isModal,
	};
};

export default useSelector;
