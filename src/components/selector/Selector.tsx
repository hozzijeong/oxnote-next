import DropDown from '../dropdown/DropDown';
import useDropDownItemController from '../dropdown/hooks/useDropDownItemController';
import useDropDownSelectController from '../dropdown/hooks/useDropDownSelectController';
import useDropDownToggleController from '../dropdown/hooks/useDropDownToggleController';
import { DropDownType } from '../dropdown/types';
import styles from './selector.module.scss';

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
			<DropDown.Modal
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
				<ul>
					{options.map((item, index) => {
						const isChecked = selected.includes(item);
						return (
							<DropDown.Item
								ref={refCallback(index)}
								key={item}
								itemType={
									isChecked || type === 'multi' ? 'checkBox' : 'default'
								}
								checked={isChecked}
								onKeyDown={itemKeydownHandler(index)}
							>
								{item}
							</DropDown.Item>
						);
					})}
				</ul>
			</DropDown.Modal>
		</DropDown>
	);
};

export default Selector;
