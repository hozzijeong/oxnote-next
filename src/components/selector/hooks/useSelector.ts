import type { DropDownType } from '@/components/dropdown/types';
import useIsBelowWidth from '@/hooks/useIsBelowWidth';
import { useCallback, useState } from 'react';

const useSelector = (initialData?: string[]) => {
	const [selected, setSelected] = useState<string[]>(initialData ?? []);

	const changeHandler = useCallback((type: DropDownType, value: string) => {
		setSelected((prev) => {
			const isInclude = prev.includes(value);

			if (isInclude) {
				return prev.filter((p) => p !== value);
			}
			return type === 'single' ? [value] : [...prev, value];
		});
	}, []);

	const isModal = useIsBelowWidth(520);

	return {
		selected,
		changeHandler,
		isModal,
	};
};

export default useSelector;
