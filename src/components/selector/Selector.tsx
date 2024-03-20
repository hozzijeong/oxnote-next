import styles from './selector.module.scss';
import DropDown, { DropDownType } from '../dropdown/DropDown';

export type SelectorProps = {
	type: DropDownType;
	options: string[];
	placeholder: string;
	selected: string[];
	changeHandler: (type: DropDownType, value: string) => void;
};

// const clickMenuOutside = useCallback((event: MouseEvent) => {
// 	if (!menuRef.current) return;

// 	const menu = menuRef.current.getBoundingClientRect();

// 	const isClickInsideMenu =
// 		menu.top - 48 <= event.clientY &&
// 		event.clientY <= menu.top + 48 + menu.height &&
// 		menu.left <= event.clientX &&
// 		event.clientX <= menu.left + menu.width;

// 	if (isClickInsideMenu) setMenuOpen(false);
// }, []);

// useEffect(() => {
// 	if (menuOpen && menuRef.current) {
// 		window.addEventListener('click', clickMenuOutside);
// 	}

// 	return () => {
// 		window.removeEventListener('click', clickMenuOutside);
// 	};
// }, [clickMenuOutside, menuOpen]);

const Selector = ({
	type,
	options,
	placeholder,
	selected,
	changeHandler,
}: SelectorProps) => {
	return (
		<DropDown type={type} changeHandler={changeHandler}>
			<DropDown.Trigger
				title={selected.length === 0 ? placeholder : selected.join(', ')}
				disabled={options.length === 0}
			/>
			<DropDown.Menu className={styles['menu-container']}>
				{options.map((item) => {
					const isChecked = selected.includes(item);
					return (
						<DropDown.Item
							key={item}
							itemType={isChecked || type === 'multi' ? 'checkBox' : 'default'}
							checked={isChecked}
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
