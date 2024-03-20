import {
	KeyboardEventHandler,
	MouseEventHandler,
	PropsWithChildren,
	forwardRef,
	useCallback,
} from 'react';
import styles from './dropdown.module.scss';
import { Button } from '..';
import DropDownProvider from './context/DropDownProvider';
import useDropDownToggle from './hooks/useDropDownToggle';

export type DropDownType = 'single' | 'multi';

type DropDownProps = PropsWithChildren & {
	type: DropDownType;
	changeHandler: (type: DropDownType, value: string) => void;
};

const DropDown = ({ type, changeHandler, children }: DropDownProps) => {
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

	return (
		<DropDownProvider>
			<div
				className={styles.wrapper}
				onClick={onClickHandler}
				onKeyDown={onKeyDownHandler}
			>
				{children}
			</div>
		</DropDownProvider>
	);
};

type TriggerProps = {
	title: string;
	disabled?: boolean;
};

const Trigger = ({ title, disabled }: TriggerProps) => {
	const { open, toggleDropDown } = useDropDownToggle();

	const triggerHandler: MouseEventHandler<HTMLButtonElement> = useCallback(
		(event) => {
			event.stopPropagation();
			toggleDropDown();
		},
		[toggleDropDown]
	);

	return (
		<Button
			className={styles['selector-button']}
			onClick={triggerHandler}
			type='button'
			disabled={disabled}
			aria-haspopup='listbox'
			aria-expanded={open}
		>
			{title}
		</Button>
	);
};

type MenuBaseProps<T extends HTMLElement> = React.HtmlHTMLAttributes<T> & {
	className?: string;
};

const Menu = forwardRef<
	HTMLUListElement,
	PropsWithChildren & MenuBaseProps<HTMLUListElement>
>(function Menu({ className, children, ...props }, ref) {
	const { open } = useDropDownToggle();

	const menuClassName = `${styles['menu']} ${className ? className : ''}`;

	return (
		open && (
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

const Item = forwardRef<
	HTMLLIElement,
	ItemProps & MenuBaseProps<HTMLLIElement>
>(function Item({ itemType = 'default', checked, className, ...props }, ref) {
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
});

export default Object.assign(DropDown, { Trigger, Item, Menu });
