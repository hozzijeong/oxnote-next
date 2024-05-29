import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './button.module.scss';

type Size = 'small' | 'medium' | 'large';
type Color = 'default' | 'primary';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	size?: Size;
	color?: Color;
	className?: string;
	children: React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{ size = 'large', color = 'default', className, children, ...props },
	ref
) {
	const buttonClassName = `${styles['base']} ${styles[size]} ${styles[color]} ${
		className ? `${className}` : ''
	}`;
	return (
		<button ref={ref} {...props} className={buttonClassName}>
			{children}
		</button>
	);
});

export default Button;
