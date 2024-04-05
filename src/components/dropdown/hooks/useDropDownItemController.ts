import { KeyboardEventHandler, useRef } from 'react';

type Props = {
	optionsCount: number;
};

type CustomKeyboardEventHandler = (
	index: number
) => KeyboardEventHandler<HTMLLIElement | HTMLButtonElement>;

const useDropDownItemController = ({ optionsCount }: Props) => {
	const itemRefs = useRef<HTMLLIElement[]>([]);

	const onKeydownHandler: CustomKeyboardEventHandler =
		(index: number) => (event) => {
			if (event.key === 'ArrowUp' && index > 0) {
				itemRefs.current[index - 1].focus();
			}

			if (event.key === 'ArrowDown' && index < optionsCount - 1) {
				itemRefs.current[index + 1].focus();
			}
		};

	const refCallback = (index: number) => (el: HTMLLIElement) => {
		itemRefs.current[index] = el;
	};

	return { refCallback, onKeydownHandler };
};

export default useDropDownItemController;
