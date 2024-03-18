import { PropsWithChildren, forwardRef } from 'react';
import styles from './dropdown.module.scss';
import { Button } from '..';

type DropDownProps = PropsWithChildren & {};

const DropDown = (props: DropDownProps) => {
	return <form className={styles.wrapper}>{props.children}</form>;
};

type TriggerProps = {
	title: string;
	onClick: () => void;
};

const Trigger = ({ title, onClick }: TriggerProps) => {
	return (
		<Button
			className={styles['selector-button']}
			onClick={onClick}
			type='button'
		>
			{title}
		</Button>
	);
};

type MenuBaseProps<T extends HTMLElement> = React.HtmlHTMLAttributes<T> & {
	className?: string;
};

const Menu = forwardRef<
	HTMLDivElement,
	PropsWithChildren & MenuBaseProps<HTMLDivElement>
>(function Menu({ className, children, ...props }, ref) {
	const menuClassName = `${styles['menu']} ${className ? className : ''}`;

	return (
		<div ref={ref} className={menuClassName} {...props}>
			{children}
		</div>
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
	type = 'button',
	...props
}: ItemProps & MenuBaseProps<HTMLButtonElement>) => {
	const itemClassName = `${styles['item']} ${
		itemType === 'checkBox' ? styles['check-box'] : ''
	} ${itemType === 'checkBox' && checked ? styles['checked'] : ''} ${
		className ? className : ''
	}`;

	return <button className={itemClassName} type={type} {...props} />;
};

export default Object.assign(DropDown, { Trigger, Item, Menu });
