import {
	KeyboardEventHandler,
	MouseEventHandler,
	PropsWithChildren,
	ReactEventHandler,
	forwardRef,
	useCallback,
	useContext,
	useLayoutEffect,
	useRef,
} from 'react';
import styles from './dropdown.module.scss';
import { Button } from '..';
import DropDownContext from './context/DropDownContext';
import { ToggleValues } from '@/hooks/useToggle';

type DropDownProps = PropsWithChildren & {
	toggles: ToggleValues;
	onClickHandler?: MouseEventHandler<HTMLDivElement>;
	onKeyDownHandler?: KeyboardEventHandler<HTMLDivElement>;
};

// TODO: DropDown 뿐만 아니라 Modal에서도 적용할 수 있도록 코드를 작성해보기

const DropDown = forwardRef<HTMLDivElement, DropDownProps>(function DropDown(
	{ children, onClickHandler, onKeyDownHandler, toggles },
	ref
) {
	return (
		<DropDownContext.Provider value={toggles}>
			<div
				ref={ref}
				className={styles.wrapper}
				onClick={onClickHandler}
				onKeyDown={onKeyDownHandler}
			>
				{children}
			</div>
		</DropDownContext.Provider>
	);
});

type TriggerProps = {
	title: string;
	disabled?: boolean;
};

const Trigger = ({
	title,
	disabled,
	className,
}: WithClassName<HTMLButtonElement> & TriggerProps) => {
	const triggerClassName = `${styles['selector-button']} ${className ?? ''}`;
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
			className={triggerClassName}
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

type WithClassName<T extends HTMLElement> = React.HtmlHTMLAttributes<T> & {
	className?: string;
};

const Menu = forwardRef<
	HTMLUListElement,
	PropsWithChildren & WithClassName<HTMLUListElement>
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

const Item = forwardRef<
	HTMLLIElement,
	ItemProps & WithClassName<HTMLLIElement>
>(function Item({ itemType = 'default', checked, className, ...props }, ref) {
	const itemClassName = `${styles['item']} ${
		itemType === 'checkBox' ? styles['check-box'] : ''
	} ${itemType === 'checkBox' && checked ? styles['checked'] : ''} ${
		className ?? ''
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

type ModalProps = PropsWithChildren &
	WithClassName<HTMLDialogElement> & {
		title?: string;
		onClose?: ReactEventHandler<HTMLDialogElement>;
		control?: React.ReactNode;
	};

const Modal = ({
	children,
	className,
	title,
	control,
	onClose,
}: ModalProps) => {
	const modalClassName = `${styles['modal']} ${className ?? ''}`;
	const { isOn: isOpen } = useContext(DropDownContext);

	const dialogRef = useRef<HTMLDialogElement>(null);

	useLayoutEffect(() => {
		if (isOpen) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [isOpen]);

	return (
		<dialog ref={dialogRef} className={modalClassName} onClose={onClose}>
			{isOpen && (
				<div className={styles['modal-content']}>
					{title && <p className={styles['modal-title']}>{title}</p>}
					{children}
					{control && control}
				</div>
			)}
		</dialog>
	);
};

export default Object.assign(DropDown, { Trigger, Item, Menu, Modal });
