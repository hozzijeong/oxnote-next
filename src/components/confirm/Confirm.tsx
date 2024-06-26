'use client';

import { useState, useEffect } from 'react';
import styles from './confirm.module.scss';
import { Button } from '..';
import { ConfirmProps } from './confirm.type';

const Confirm = ({
	title,
	message,
	onConfirm,
	onClose,
	onCancel,
}: ConfirmProps) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(true);
	}, []);

	const handleConfirm = () => {
		setVisible(false);
		onConfirm();
		setTimeout(onClose, 200);
	};

	const handleCancel = () => {
		setVisible(false);
		onCancel();
		setTimeout(onClose, 200);
	};

	return (
		<div className={`${styles.overlay}`}>
			<div
				className={`${styles.confirm} ${visible ? styles.show : styles.hide}`}
			>
				{title && <p className={styles.title}>{title}</p>}
				<p>{message}</p>
				<div className={styles.buttons}>
					<Button
						size='medium'
						className={`${styles['basic-button']}`}
						onClick={handleCancel}
					>
						취소하기
					</Button>
					<Button
						size='medium'
						className={`${styles['basic-button']} ${styles['confirm-button']}`}
						onClick={handleConfirm}
					>
						확인
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Confirm;
