import { KeyboardEventHandler, MouseEventHandler } from 'react';
import { DropDownType } from '../DropDown';

type Props = {
	type: DropDownType;
	changeHandler: (type: DropDownType, value: string) => void;
};

const useDropDownSelectController = ({ type, changeHandler }: Props) => {
	const onClickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
		if (event.target instanceof HTMLLIElement) {
			const { textContent } = event.target;

			changeHandler(type, textContent ?? '');
		}
	};

	const onKeyDownHandler: KeyboardEventHandler<HTMLDivElement> = (event) => {
		const { code, target } = event;
		if (!(target instanceof HTMLLIElement)) return;

		if (code === 'Space' || code === 'Enter') {
			const { textContent } = target;

			changeHandler(type, textContent ?? '');
		}
	};

	return { onClickHandler, onKeyDownHandler };
};

export default useDropDownSelectController;
