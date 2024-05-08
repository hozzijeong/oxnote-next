'use client';

import useToggle from '@/hooks/useToggle';
import styles from './quiz-detail.module.scss';
import { FavoriteButton } from '@/components';
import { useEffect, useState } from 'react';
import { QuizInfo } from '@/types/quiz';
import { http } from '@/lib/api';
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

const QuizDetail = ({ params: { id } }: Params) => {
	const { isOn: explainOn, toggle: explainHandler } = useToggle();

	const [quiz, setQuiz] = useState<QuizInfo | null>(null);

	useEffect(() => {
		const getQuiz = async () => {
			const data = await http.get<QuizInfo>(`/api/quiz/${id}`);

			if (data.message === 'FAILURE') {
				throw new Error(data.errors.message);
			}

			setQuiz(data.data);
		};

		getQuiz();
	}, [id]);

	const answerClickHandler: React.MouseEventHandler<HTMLDivElement> = (
		event
	) => {
		if (!(event.target instanceof HTMLButtonElement)) return;

		const { value } = event.target;

		const answer = Boolean(Number(value));
	};

	const favoriteClickHandler = () => {
		console.log('클릭');
	};

	return (
		<section className={styles['box']}>
			<div className={styles['quiz-container']}>
				<p className={styles['paragraph']}>{quiz?.title}</p>
				<FavoriteButton
					isFavorite={Boolean(quiz?.favorite)}
					onClick={favoriteClickHandler}
				/>
			</div>

			<div className={styles['answer-container']}>
				<button type='button' onClick={explainHandler}>{`해설 ${
					explainOn ? '닫기' : '보기'
				}`}</button>
				{explainOn && <p className={styles['paragraph']}>{quiz?.explain}</p>}
			</div>

			<div
				role='button'
				className={styles['button-container']}
				onClick={answerClickHandler}
			>
				<button
					className={`${styles.button} ${styles['false-bg']}`}
					type='button'
					value={0}
				>
					X
				</button>
				<button
					className={`${styles.button} ${styles['true-bg']}`}
					type='button'
					value={1}
				>
					O
				</button>
			</div>
		</section>
	);
};

export default QuizDetail;
