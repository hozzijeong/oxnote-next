import { PropsWithChildren } from 'react';
import styles from './inputLabel.module.scss';

export type InputLabelProps = {
	title: string;
	htmlFor: string;
};

const InputLabel = ({
	title,
	children,
	htmlFor,
}: InputLabelProps & PropsWithChildren) => {
	return (
		<div className={styles.wrapper}>
			<label className={styles.title} htmlFor={htmlFor}>
				{title}
			</label>
			{children}
		</div>
	);
};

export default InputLabel;
