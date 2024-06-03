'use client';

import { useEffect, useState } from 'react';
import styles from './toast.module.scss';
import { ToastProps } from './toast.type';

const Toast = ({ message, onClose, duration = 2000 }: ToastProps) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(true);
		const timer = setTimeout(() => {
			setVisible(false);
			setTimeout(onClose, 500); // Wait for animation to complete
		}, duration);

		return () => {
			clearTimeout(timer);
		};
	}, [duration, onClose]);

	return (
		<div className={`${styles.toast} ${visible ? styles.show : styles.hide} `}>
			{message}
		</div>
	);
};

export default Toast;
