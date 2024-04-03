'use client';

import styles from './quiz-form.module.scss';
import { PropsWithChildren } from 'react';
import { InputLabel, Button } from '@/components';
import { ButtonProps } from '../button/Button';

const QuizForm = ({
	children,
}: PropsWithChildren & React.HtmlHTMLAttributes<HTMLFormElement>) => {
	return <form className={styles['quiz-form']}>{children}</form>;
};

type SubmitButtonProps = ButtonProps & {
	type: 'reset' | 'submit';
};

const SubmitButton = (props: SubmitButtonProps) => {
	return <Button {...props} />;
};

export default Object.assign(QuizForm, {
	FormElement: InputLabel,
	SubmitButton,
});
