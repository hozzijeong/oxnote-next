import styles from './selector.module.scss';
import DropDown, { DropDownType } from '../dropdown/DropDown';
import { KeyboardEvent, useRef } from 'react';

export type SelectorProps = {
	type: DropDownType;
	options: string[];
	placeholder: string;
	selected: string[];
	changeHandler: (type: DropDownType, value: string) => void;
};

const Selector = ({
	type,
	options,
	placeholder,
	selected,
	changeHandler,
}: SelectorProps) => {
	const itemRefs = useRef<HTMLLIElement[]>([]);

	const handleKeyDown = (index: number) => (event: KeyboardEvent) => {
		if (event.key === 'ArrowUp' && index > 0) {
			itemRefs.current[index - 1].focus();
		}

		if (event.key === 'ArrowDown' && index < options.length - 1) {
			itemRefs.current[index + 1].focus();
		}
	};

	const refCallback = (index: number) => (el: HTMLLIElement) => {
		itemRefs.current[index] = el;
	};

	return (
		<DropDown type={type} changeHandler={changeHandler}>
			<DropDown.Trigger
				title={selected.length === 0 ? placeholder : selected.join(', ')}
				disabled={options.length === 0}
			/>
			<DropDown.Menu className={styles['menu-container']}>
				{options.map((item, index) => {
					const isChecked = selected.includes(item);
					return (
						<DropDown.Item
							ref={refCallback(index)}
							key={item}
							itemType={isChecked || type === 'multi' ? 'checkBox' : 'default'}
							checked={isChecked}
							onKeyDown={handleKeyDown(index)}
						>
							{item}
						</DropDown.Item>
					);
				})}
			</DropDown.Menu>
		</DropDown>
	);
};

export default Selector;
