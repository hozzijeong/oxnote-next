import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './input.module.scss';

type Mode = 'text';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	mode?: Mode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ mode, className, ...props },
	ref
) {
	const currentClassName = `${styles.base} ${className} ${
		mode ? styles[mode] : ''
	}`;

	return <input ref={ref} {...props} className={currentClassName} />;
});

export default Input;
