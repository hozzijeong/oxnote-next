import {
	KeyboardEventHandler,
	MouseEventHandler,
	PropsWithChildren,
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from 'react';
import styles from './dropdown.module.scss';
import { Button } from '..';
import DropDownContext from './context/DropDownContext';
import useToggle from '@/hooks/useToggle';

type DropDownProps = PropsWithChildren & {
	onClickHandler: MouseEventHandler<HTMLDivElement>;
	onKeyDownHandler: KeyboardEventHandler<HTMLDivElement>;
};

// TODO: DropDown 뿐만 아니라 Modal에서도 적용할 수 있도록 코드를 작성해보기

const DropDown = ({
	children,
	onClickHandler,
	onKeyDownHandler,
}: DropDownProps) => {
	const toggles = useToggle();
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				toggles.close();
			}
		};

		const handleKeyDownHandler = (event: KeyboardEvent) => {
			const { code } = event;

			if (code === 'Escape' || code === 'Backspace') {
				toggles.close();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDownHandler);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDownHandler);
		};
	}, [toggles]);

	return (
		<DropDownContext.Provider value={toggles}>
			<div
				ref={dropdownRef}
				className={styles.wrapper}
				onClick={onClickHandler}
				onKeyDown={onKeyDownHandler}
			>
				{children}
			</div>
		</DropDownContext.Provider>
	);
};

type TriggerProps = {
	title: string;
	disabled?: boolean;
};

// TODO: trigger의 형태가 일반적인 selector-button의 형태가 아니라 다른 형식으로도 나타날 수 있을 것 같다는 생각을 함.

const Trigger = ({ title, disabled }: TriggerProps) => {
	const { isOn: isOpen, toggle } = useContext(DropDownContext);

	const triggerHandler: MouseEventHandler<HTMLButtonElement> = useCallback(
		(event) => {
			event.stopPropagation();
			toggle();
		},
		[toggle]
	);

	return (
		<Button
			className={styles['selector-button']}
			onClick={triggerHandler}
			type='button'
			disabled={disabled}
			aria-haspopup='listbox'
			aria-expanded={isOpen}
		>
			{title}
		</Button>
	);
};

type MenuProps<T extends HTMLElement> = React.HtmlHTMLAttributes<T> & {
	className?: string;
};

const Menu = forwardRef<
	HTMLUListElement,
	PropsWithChildren & MenuProps<HTMLUListElement>
>(function Menu({ className, children, ...props }, ref) {
	const menuClassName = `${styles['menu']} ${className ? className : ''}`;

	const { isOn: isOpen } = useContext(DropDownContext);

	return (
		isOpen && (
			<ul
				ref={ref}
				className={menuClassName}
				aria-labelledby='dropdown'
				tabIndex={-1}
				aria-activedescendant='dropdown'
				role='listbox'
				{...props}
			>
				{children}
			</ul>
		)
	);
});

type ItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	itemType: 'default' | 'checkBox';
	checked?: boolean;
};

const Item = forwardRef<HTMLLIElement, ItemProps & MenuProps<HTMLLIElement>>(
	function Item({ itemType = 'default', checked, className, ...props }, ref) {
		const itemClassName = `${styles['item']} ${
			itemType === 'checkBox' ? styles['check-box'] : ''
		} ${itemType === 'checkBox' && checked ? styles['checked'] : ''} ${
			className ? className : ''
		}`;

		return (
			<li
				ref={ref}
				className={itemClassName}
				role='option'
				tabIndex={0}
				aria-selected={checked}
				{...props}
			/>
		);
	}
);

export default Object.assign(DropDown, { Trigger, Item, Menu });
