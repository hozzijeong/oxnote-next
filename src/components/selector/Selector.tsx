import { useMemo } from 'react';
import DropDown from '../dropdown/DropDown';
import {
	useDropDownItemController,
	useDropDownSelectController,
	useDropDownToggleController,
} from '../dropdown/hooks';
import { DropDownType } from '../dropdown/types';
import styles from './selector.module.scss';
import useIsBelowWidth from '@/hooks/useIsBelowWidth';

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
	const { toggles, dropdownRef } = useDropDownToggleController();

	const { onClickHandler, onKeyDownHandler } = useDropDownSelectController({
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

	// TODO: mid-device 크기만큼 비교하는 것
	const isBelowMidDevice = useIsBelowWidth(520);

	return (
		<DropDown
			toggles={toggles}
			ref={dropdownRef}
			onClickHandler={onClickHandler}
			onKeyDownHandler={onKeyDownHandler}
		>
			<DropDown.Trigger
				className={selected.length === 0 ? styles['placeholder'] : ''}
				title={selected.length === 0 ? placeholder : selected.join(', ')}
				disabled={options.length === 0}
			/>
			{isBelowMidDevice ? (
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
