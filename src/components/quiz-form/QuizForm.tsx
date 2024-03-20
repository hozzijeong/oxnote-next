'use client';

import styles from './quiz-form.module.scss';
import { PropsWithChildren } from 'react';
import { InputLabel, Button } from '@/components';

const QuizForm = ({
	children,
}: PropsWithChildren & React.HtmlHTMLAttributes<HTMLFormElement>) => {
	return <form className={styles['quiz-form']}>{children}</form>;
};

type SubmitButtonProps = {
	title: string;
	cancelHandler: () => void;
};

const SubmitButtons = (props: SubmitButtonProps) => {
	const { title, cancelHandler } = props;

	return (
		<div className={styles['button-container']}>
			<Button type='reset' size='small' onClick={cancelHandler}>
				취소하기
			</Button>
			<Button type='submit' size='small' color='primary'>
				{title}
			</Button>
		</div>
	);
};

export default Object.assign(QuizForm, {
	FormElement: InputLabel,
	SubmitButtons,
});
