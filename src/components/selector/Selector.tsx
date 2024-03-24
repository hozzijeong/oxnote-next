import styles from './selector.module.scss';
import DropDown from '../dropdown/DropDown';
import useDropDownItemController from '../dropdown/hooks/useDropDownItemController';
import useDropDownSelectController from '../dropdown/hooks/useDropDownSelectController';
import { DropDownType } from '../dropdown/types';

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
	const { onClickHandler, onKeyDownHandler } = useDropDownSelectController({
		changeHandler,
		type,
	});

	const { refCallback, handleKeyDown } = useDropDownItemController({
		optionsCount: options.length,
	});

	return (
		<DropDown
			onClickHandler={onClickHandler}
			onKeyDownHandler={onKeyDownHandler}
		>
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
