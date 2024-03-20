import {
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

			if (textContent === null) {
				throw new Error('잘못된 DropDown 사용입니다. 데이터를 확인해주세요');
			}

			changeHandler(type, textContent);
		}
	};

	return (
		<DropDownProvider>
			<div className={styles.wrapper} onClick={onClickHandler}>
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
	const { toggleDropDown } = useDropDownToggle();

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
			<ul ref={ref} className={menuClassName} {...props}>
				{children}
			</ul>
		)
	);
});

type ItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	itemType: 'default' | 'checkBox';
	checked?: boolean;
};

const Item = ({
	itemType = 'default',
	checked,
	className,
	...props
}: ItemProps & MenuBaseProps<HTMLLIElement>) => {
	const itemClassName = `${styles['item']} ${
		itemType === 'checkBox' ? styles['check-box'] : ''
	} ${itemType === 'checkBox' && checked ? styles['checked'] : ''} ${
		className ? className : ''
	}`;

	return <li className={itemClassName} {...props} />;
};

export default Object.assign(DropDown, { Trigger, Item, Menu });
