import { KeyboardEventHandler, MouseEventHandler } from 'react';
import { DropDownType } from '../types';

type Props = {
	type: DropDownType;
	changeHandler: (type: DropDownType, value: string) => void;
};

const useDropDownSelectController = ({ type, changeHandler }: Props) => {
	const clickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
		if (event.target instanceof HTMLLIElement) {
			const { textContent } = event.target;

			changeHandler(type, textContent ?? '');
		}
	};

	const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = (event) => {
		const { code, target } = event;
		if (!(target instanceof HTMLLIElement)) return;

		if (code === 'Space' || code === 'Enter') {
			const { textContent } = target;

			changeHandler(type, textContent ?? '');
		}
	};

	return { clickHandler, keyDownHandler };
};

export default useDropDownSelectController;
