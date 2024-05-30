import { useMemo } from 'react';
import DropDown from '../dropdown/DropDown';
import {
	useDropDownItemController,
	useDropDownSelectController,
	useDropDownToggleController,
} from '../dropdown/hooks';
import { DropDownType } from '../dropdown/types';
import styles from './selector.module.scss';

export type SelectorProps = {
	type: DropDownType;
	options: string[];
	placeholder: string;
	selected: string[];
	changeHandler: (type: DropDownType, value: string) => void;
	isModal?: boolean;
	disabled?: boolean;
};

const Selector = ({
	type,
	options,
	placeholder,
	selected,
	changeHandler,
	isModal,
	disabled = false,
}: SelectorProps) => {
	const { toggles, dropdownRef } = useDropDownToggleController();

	const { clickHandler, keyDownHandler } = useDropDownSelectController({
		changeHandler,
		type,
	});

	const { refCallback, onKeydownHandler: itemKeydownHandler } =
		useDropDownItemController({
			optionsCount: options.length,
		});

	const optionItems = useMemo(
		() =>
			options.map((item, index) => {
				const isChecked = selected.includes(item);
				return (
					<DropDown.Item
						ref={refCallback(index)}
						key={item}
						itemType={isChecked || type === 'multi' ? 'checkBox' : 'default'}
						checked={isChecked}
						onKeyDown={itemKeydownHandler(index)}
					>
						{item}
					</DropDown.Item>
				);
			}),
		[itemKeydownHandler, options, refCallback, selected, type]
	);

	return (
		<DropDown
			toggles={toggles}
			ref={dropdownRef}
			clickHandler={clickHandler}
			keyDownHandler={keyDownHandler}
		>
			<DropDown.Trigger
				className={selected.length === 0 ? styles['placeholder'] : ''}
				title={selected.length === 0 ? placeholder : selected.join(', ')}
				disabled={options.length === 0 || disabled}
			/>
			{isModal ? (
				<DropDown.Modal
					title={placeholder}
					control={
						<div className={styles['modal-controller-container']}>
							<button
								className={styles['modal-cancel-button']}
								type='button'
								onClick={toggles.close}
							>
								선택 완료
							</button>
						</div>
					}
				>
					<ul>{optionItems}</ul>
				</DropDown.Modal>
			) : (
				<DropDown.Menu className={styles['menu-container']}>
					{optionItems}
				</DropDown.Menu>
			)}
		</DropDown>
	);
};

export default Selector;
